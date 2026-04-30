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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, "..");
const POSTS_DIR = path.join(REPO_ROOT, "blog", "posts");

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 14.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0 Safari/537.36";

// ---------- argument parsing ----------
const args = process.argv.slice(2);
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

// Validate all URLs look like LinkedIn
const linkedinRe = /^https?:\/\/(www\.)?linkedin\.com\//i;
const invalid = urls.filter((u) => !linkedinRe.test(u));
if (invalid.length > 0) {
  console.error("Error: these URLs are not linkedin.com links:");
  invalid.forEach((u) => console.error("  " + u));
  process.exit(1);
}

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
const summary = [];

for (let i = 0; i < urls.length; i++) {
  const url = urls[i];
  const prefix = `[${i + 1}/${urls.length}]`;
  try {
    const result = await processOne(url);
    if (result.status === "created") {
      created++;
      console.log(`${prefix} ✓ Created: ${result.filename}`);
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
console.log(`Done. Created: ${created}  Skipped: ${skipped}  Failed: ${failed}`);

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
  console.error("Re-running is safe — existing posts are skipped.");
  console.error("");
  process.exit(1);
}

async function processOne(url) {
  // Quick check: does a file for this URL already exist? We hash the URL
  // into the filename pattern, so checking by exact match is approximate.
  // Instead, look for any existing file whose frontmatter `external` field
  // matches this URL.
  const existingMatch = findExistingPostFor(url);
  if (existingMatch) {
    return { status: "skipped", filename: path.basename(existingMatch) };
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
  const publishedRaw =
    meta(html, "article:published_time") || meta(html, "datePublished") || "";

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

  if (fs.existsSync(filepath)) {
    return { status: "skipped", filename };
  }

  const frontmatter = [
    "---",
    `title: "${escapeForYaml(title)}"`,
    `slug: linkedin-${slug}`,
    `date: ${dateStr}`,
    `excerpt: "${escapeForYaml(description.slice(0, 280))}"`,
    `source: linkedin`,
    `external: "${url}"`,
    ...(image ? [`image: "${image}"`] : []),
    "---",
    "",
    description ? `${description}\n\n` : "",
    `*This article was originally published on LinkedIn.* [Read the full piece →](${url})`,
    "",
  ].join("\n");

  if (!fs.existsSync(POSTS_DIR)) fs.mkdirSync(POSTS_DIR, { recursive: true });
  fs.writeFileSync(filepath, frontmatter, "utf8");

  return { status: "created", filename, title };
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

function escapeForYaml(s) {
  return s.replace(/"/g, '\\"');
}
