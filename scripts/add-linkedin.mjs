#!/usr/bin/env node
// scripts/add-linkedin.mjs
//
// Adds a LinkedIn article as a markdown post in blog/posts/.
// Fetches the article URL, extracts public Open Graph metadata
// (title, description, image, published date), and writes a
// markdown file with the right frontmatter.
//
// Usage:
//   npm run add-linkedin -- https://www.linkedin.com/pulse/your-article-slug-tarun-bulchandani
//
// What it does:
//   1. Fetches the URL
//   2. Pulls og:title / og:description / og:image / article:published_time
//   3. Generates a slug from the title
//   4. Writes blog/posts/{date}-linkedin-{slug}.md with source: linkedin
//
// What it does NOT do:
//   - Pull the body of the article (LinkedIn doesn't expose it in OG tags;
//     the post on your blog will link out to LinkedIn for the full read)

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, "..");
const POSTS_DIR = path.join(REPO_ROOT, "blog", "posts");

const url = process.argv[2];
if (!url) {
  console.error("Usage: npm run add-linkedin -- <linkedin-article-url>");
  process.exit(1);
}
if (!/^https?:\/\/(www\.)?linkedin\.com\//i.test(url)) {
  console.error("Error: URL must be a linkedin.com link.");
  console.error("Got:  ", url);
  process.exit(1);
}

const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 14.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0 Safari/537.36";

console.log("Fetching:", url);
let html;
try {
  const res = await fetch(url, { headers: { "User-Agent": UA, "Accept-Language": "en-GB,en;q=0.9" } });
  if (!res.ok) {
    console.error(`Error: HTTP ${res.status} ${res.statusText}`);
    console.error("LinkedIn may have blocked the request, or the URL is wrong.");
    process.exit(2);
  }
  html = await res.text();
} catch (err) {
  console.error("Error: fetch failed:", err.message);
  process.exit(2);
}

// Extract a meta tag's content. Tries property= and name= variants.
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

const title = meta(html, "og:title") || "Untitled";
const description = meta(html, "og:description") || "";
const image = meta(html, "og:image") || "";
const publishedRaw = meta(html, "article:published_time") || meta(html, "datePublished") || "";

let date;
if (publishedRaw) {
  const d = new Date(publishedRaw);
  date = isNaN(d) ? new Date() : d;
} else {
  date = new Date();
}
const dateStr = date.toISOString().slice(0, 10);

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}
const slug = slugify(title) || "untitled";

const filename = `${dateStr}-linkedin-${slug}.md`;
const filepath = path.join(POSTS_DIR, filename);

if (fs.existsSync(filepath)) {
  console.error(`Error: ${filename} already exists. Refusing to overwrite.`);
  process.exit(3);
}

function escapeForYaml(s) {
  return s.replace(/"/g, '\\"');
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

if (!fs.existsSync(POSTS_DIR)) {
  fs.mkdirSync(POSTS_DIR, { recursive: true });
}
fs.writeFileSync(filepath, frontmatter, "utf8");

console.log("");
console.log("✓ Created", path.relative(REPO_ROOT, filepath));
console.log("  Title:    ", title);
console.log("  Date:     ", dateStr);
console.log("  External: ", url);
if (image) console.log("  Image:    ", image);
console.log("");
console.log("Review the file, then commit:");
console.log(`  git add ${path.relative(REPO_ROOT, filepath)}`);
console.log(`  git commit -m "Add LinkedIn post: ${title.slice(0, 50)}"`);
console.log(`  git push`);
