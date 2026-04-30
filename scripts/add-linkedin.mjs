#!/usr/bin/env node
// scripts/add-linkedin.mjs
//
// Adds one or more LinkedIn articles as markdown posts in blog/posts/.
// For each URL, fetches the page, extracts public Open Graph metadata
// (title, description, image, published date), and writes a markdown file
// with the right frontmatter.
//
// Usage (single):
//   npm run add-linkedin -- https://www.linkedin.com/pulse/your-article-...
//
// Usage (bulk, multiple URLs as args):
//   npm run add-linkedin -- https://linkedin.com/pulse/a https://linkedin.com/pulse/b
//
// Usage (bulk, from a file with one URL per line):
//   npm run add-linkedin -- --from-file data/linkedin-articles.txt
//
// Re-running is safe — URLs that already have a markdown file are skipped.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import TurndownService from "turndown";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, "..");
const POSTS_DIR = path.join(REPO_ROOT, "blog", "posts");

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 14.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0 Safari/537.36";

// ---------- argument parsing ----------
const rawArgs = process.argv.slice(2);
const refresh = rawArgs.includes("--refresh");
const args = rawArgs.filter((a) => a !== "--refresh");
let urls = [];

if (args.length === 0) {
  printUsageAndExit();
}

if (args[0] === "--from-file" || args[0] === "-f") {
  const filePath = args[1];
  if (!filePath) {
    console.error("Error: --from-file needs a path argument.\n");
    printUsageAndExit();
  }
  if (!fs.existsSync(filePath)) {
    console.error(`Error: file not found: ${filePath}`);
    process.exit(1);
  }
  urls = fs
    .readFileSync(filePath, "utf8")
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && !s.startsWith("#"));
} else {
  urls = args;
}

// Validate all URLs look like LinkedIn, then normalize them (strip query
// strings, fragments, trailing slashes — all noise that breaks dedup).
const linkedinRe = /^https?:\/\/(www\.)?linkedin\.com\//i;
const invalid = urls.filter((u) => !linkedinRe.test(u));
if (invalid.length > 0) {
  console.error("Error: these URLs are not linkedin.com links:");
  invalid.forEach((u) => console.error("  " + u));
  process.exit(1);
}

urls = urls.map(normalizeUrl);

if (urls.length === 0) {
  console.error("Error: no URLs found.\n");
  printUsageAndExit();
}

// Deduplicate while preserving order
urls = Array.from(new Set(urls));

console.log(`Processing ${urls.length} URL${urls.length === 1 ? "" : "s"}...\n`);

// ---------- main loop ----------
let created = 0;
let skipped = 0;
let failed = 0;
let withBody = 0;
let excerptOnly = 0;
const summary = [];

for (let i = 0; i < urls.length; i++) {
  const url = urls[i];
  const prefix = `[${i + 1}/${urls.length}]`;
  try {
    const result = await processOne(url);
    if (result.status === "created") {
      created++;
      const tag = result.hasFullBody ? "✓ full body" : "○ excerpt only";
      if (result.hasFullBody) withBody++;
      else excerptOnly++;
      console.log(`${prefix} ${tag}: ${result.filename}`);
      summary.push({ url, ok: true, file: result.filename, title: result.title });
    } else if (result.status === "skipped") {
      skipped++;
      console.log(`${prefix} ↷ Skipped (already exists): ${result.filename}`);
      summary.push({ url, ok: true, file: result.filename, skipped: true });
    }
  } catch (err) {
    failed++;
    console.error(`${prefix} ✗ Failed: ${url}`);
    console.error(`         ${err.message}`);
    summary.push({ url, ok: false, error: err.message });
  }
}

// ---------- summary ----------
console.log("");
console.log("─".repeat(60));
console.log(`Done. Created: ${created} (full body: ${withBody}, excerpt only: ${excerptOnly})  Skipped: ${skipped}  Failed: ${failed}`);

if (created > 0) {
  console.log("");
  console.log("Next:");
  console.log("  git add blog/posts/");
  console.log("  git commit -m \"Add LinkedIn posts\"");
  console.log("  git push");
}
if (failed > 0) {
  console.log("");
  console.log("Failed URLs (you can retry these later):");
  summary.filter((s) => !s.ok).forEach((s) => {
    console.log("  " + s.url + "  — " + s.error);
  });
}

process.exit(failed > 0 && created === 0 ? 2 : 0);

// ============================================================

function printUsageAndExit() {
  console.error("");
  console.error("Usage:");
  console.error("  npm run add-linkedin -- <url>                       (one URL)");
  console.error("  npm run add-linkedin -- <url1> <url2> <url3> ...    (multiple)");
  console.error("  npm run add-linkedin -- --from-file <path>          (one URL per line)");
  console.error("");
  console.error("Add --refresh to re-fetch existing posts (e.g. after updating");
  console.error("the parser to extract more from each article):");
  console.error("  npm run add-linkedin -- --from-file <path> --refresh");
  console.error("");
  console.error("Re-running without --refresh skips URLs that already have a post.");
  console.error("");
  process.exit(1);
}

async function processOne(url) {
  // If a file for this URL already exists, skip — UNLESS --refresh is set,
  // in which case we delete the old file and re-fetch with the latest parser.
  const existingMatch = findExistingPostFor(url);
  if (existingMatch && !refresh) {
    return { status: "skipped", filename: path.basename(existingMatch) };
  }
  if (existingMatch && refresh) {
    fs.unlinkSync(existingMatch);
  }

  let html;
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA, "Accept-Language": "en-GB,en;q=0.9" },
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText} (LinkedIn may have rate-limited or blocked)`);
    }
    html = await res.text();
  } catch (err) {
    throw new Error(`fetch failed: ${err.message}`);
  }

  const title = meta(html, "og:title") || "Untitled";
  const description = meta(html, "og:description") || "";
  const image = meta(html, "og:image") || "";

  // Date extraction is layered. LinkedIn doesn't expose article:published_time
  // in OG tags, so we try in order:
  //   1. JSON-LD "datePublished" (most reliable, matches what LinkedIn shows)
  //   2. og:article:published_time (rare on LinkedIn but standard elsewhere)
  //   3. The timestamp embedded in the og:image URL (LinkedIn article-cover
  //      images contain the upload epoch ms in /0/<timestamp>?)
  //   4. Today's date (fallback)
  let publishedRaw =
    extractJsonLdDate(html) ||
    meta(html, "article:published_time") ||
    meta(html, "datePublished") ||
    extractDateFromImageUrl(image) ||
    "";

  let date;
  if (publishedRaw) {
    const d = new Date(publishedRaw);
    date = isNaN(d) ? new Date() : d;
  } else {
    date = new Date();
  }
  const dateStr = date.toISOString().slice(0, 10);
  const slug = slugify(title) || "untitled";

  const filename = `${dateStr}-linkedin-${slug}.md`;
  const filepath = path.join(POSTS_DIR, filename);

  if (fs.existsSync(filepath) && !refresh) {
    return { status: "skipped", filename };
  }

  // Try to extract the full article body. If extraction fails (LinkedIn
  // changes the HTML structure, or the article is gated, etc.), we fall
  // back to the excerpt + link-out behavior.
  const bodyMarkdown = extractArticleBody(html);
  const hasFullBody = bodyMarkdown && bodyMarkdown.length > 200;

  const fmLines = [
    "---",
    `title: "${escapeForYaml(title)}"`,
    `slug: linkedin-${slug}`,
    `date: ${dateStr}`,
    `excerpt: "${escapeForYaml(description.slice(0, 280))}"`,
    `source: linkedin`,
    `external: "${url}"`,
    ...(image ? [`image: "${image}"`] : []),
    `has_body: ${hasFullBody ? "true" : "false"}`,
    "---",
    "",
  ];

  let bodyContent;
  if (hasFullBody) {
    bodyContent = bodyMarkdown + "\n";
  } else {
    bodyContent =
      (description ? description + "\n\n" : "") +
      `*This article was originally published on LinkedIn.* [Read the full piece →](${url})\n`;
  }

  if (!fs.existsSync(POSTS_DIR)) fs.mkdirSync(POSTS_DIR, { recursive: true });
  fs.writeFileSync(filepath, fmLines.join("\n") + bodyContent, "utf8");

  return { status: "created", filename, title, hasFullBody };
}

function findExistingPostFor(url) {
  if (!fs.existsSync(POSTS_DIR)) return null;
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  for (const file of files) {
    const content = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
    // Look for `external: "<url>"` in the frontmatter
    if (content.includes(`external: "${url}"`)) {
      return path.join(POSTS_DIR, file);
    }
  }
  return null;
}

function meta(html, key) {
  const patterns = [
    new RegExp(`<meta[^>]+property=["']${key}["'][^>]+content=["']([^"']+)["']`, "i"),
    new RegExp(`<meta[^>]+name=["']${key}["'][^>]+content=["']([^"']+)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${key}["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${key}["']`, "i"),
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m) return decodeHtmlEntities(m[1].trim());
  }
  return null;
}

// Extract the full article body from LinkedIn HTML and convert to markdown.
// Returns null if extraction fails so the caller can fall back to excerpt-only.
//
// LinkedIn structure (as of Apr 2026): each paragraph/heading lives inside
// its own <div class="article-main__content" data-test-id="publishing-text-block">.
// We collect those blocks, glue them together, and run the result through
// turndown. Light pre-processing handles LinkedIn's bold-via-span trick
// (font-[700]) and stripping the empty <span class> wrappers.
function extractArticleBody(html) {
  try {
    const blockRe =
      /<div[^>]*class="[^"]*article-main__content[^"]*"[^>]*>([\s\S]*?)<\/div>/g;
    const blocks = [];
    let m;
    while ((m = blockRe.exec(html)) !== null) {
      blocks.push(m[1]);
    }
    if (blocks.length === 0) return null;

    let combined = blocks.join("\n");

    // LinkedIn wraps body text in <span class>...</span> with no class value.
    // Bold is <span class="font-[700]">...</span>. Convert those before
    // running through turndown (which would otherwise leave the spans alone).
    combined = combined
      // Bold spans → <strong>
      .replace(/<span\s+class="font-\[700\]"[^>]*>([\s\S]*?)<\/span>/g, "<strong>$1</strong>")
      // Italic spans → <em>
      .replace(/<span\s+class="italic"[^>]*>([\s\S]*?)<\/span>/g, "<em>$1</em>")
      // Empty/wrapper spans → just keep the inner content
      .replace(/<span\s+class[^>]*>([\s\S]*?)<\/span>/g, "$1")
      // Strip LinkedIn-specific HTML comments like <!---->
      .replace(/<!---*>/g, "")
      // Strip stray empty <p><br></p>
      .replace(/<p>\s*<br\s*\/?>\s*<\/p>/g, "")
      // Collapse whitespace
      .replace(/\s+/g, " ")
      .trim();

    if (!combined || combined.length < 50) return null;

    const turndown = new TurndownService({
      headingStyle: "atx",         // ## headings, not underline
      bulletListMarker: "-",
      codeBlockStyle: "fenced",
      emDelimiter: "_",
    });

    // LinkedIn often uses bold <strong> as visual headings. If a paragraph
    // is ONLY bold text (no other content) and short, promote it to ## h2.
    turndown.addRule("boldAsHeading", {
      filter: (node) =>
        node.nodeName === "P" &&
        node.children.length === 1 &&
        node.children[0].nodeName === "STRONG" &&
        node.textContent.trim().length < 100 &&
        node.textContent.trim().length > 0,
      replacement: (content, node) => "\n\n## " + node.textContent.trim() + "\n\n",
    });

    let md = turndown.turndown(combined);

    // Tidy up: collapse 3+ blank lines, trim leading/trailing whitespace
    md = md.replace(/\n{3,}/g, "\n\n").trim();

    return md;
  } catch (err) {
    console.warn("  body extraction failed:", err.message);
    return null;
  }
}

// Pull the first datePublished value out of any JSON-LD <script> on the page.
// LinkedIn embeds article schema like:
//   "datePublished":"2023-05-05T00:19:02.000+00:00"
function extractJsonLdDate(html) {
  // Look across the entire page (not just inside <script type="application/ld+json">)
  // because LinkedIn duplicates it in several places.
  const m = html.match(/"datePublished"\s*:\s*"([^"]+)"/);
  return m ? m[1] : null;
}

// LinkedIn article cover images embed the upload timestamp in the URL:
//   .../article-cover_image-shrink_720_1280/0/1683245726457?...
// That epoch ms is a close proxy for when the article was published.
function extractDateFromImageUrl(imageUrl) {
  if (!imageUrl) return null;
  const m = imageUrl.match(/\/0\/(\d{10,13})\?/);
  if (!m) return null;
  const raw = m[1];
  const ms = raw.length === 13 ? parseInt(raw, 10) : parseInt(raw, 10) * 1000;
  const d = new Date(ms);
  return isNaN(d) ? null : d.toISOString();
}

function decodeHtmlEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#x27;/g, "'")
    .replace(/&rsquo;/g, "’")
    .replace(/&lsquo;/g, "‘")
    .replace(/&ldquo;/g, "“")
    .replace(/&rdquo;/g, "”")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–");
}

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

// Normalize a LinkedIn URL: strip query string, fragment, and trailing slash.
// Different shares of the same article often have different ?trackingId=…
// query params; stripping them gives us a canonical form for dedup.
function normalizeUrl(url) {
  try {
    const u = new URL(url);
    u.search = "";
    u.hash = "";
    let str = u.toString();
    if (str.endsWith("/")) str = str.slice(0, -1);
    return str;
  } catch (e) {
    return url;
  }
}

function escapeForYaml(s) {
  return s.replace(/"/g, '\\"');
}
