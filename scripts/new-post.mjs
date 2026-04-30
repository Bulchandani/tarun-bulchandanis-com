#!/usr/bin/env node
// scripts/new-post.mjs
//
// Scaffolds a new blog post (your own writing, not a LinkedIn import).
// Generates the markdown file with the right frontmatter so all you have
// to do is write.
//
// Usage:
//   npm run new-post -- "Architecture under uncertainty"
//   npm run new-post -- "Some title" --draft
//
// What it does:
//   1. Generates a slug from the title
//   2. Creates blog/posts/{YYYY-MM-DD}-{slug}.md with frontmatter
//   3. Prints the path so you can open it in your editor
//
// After writing your post:
//   git add blog/posts/<the-file>
//   git commit -m "Post: <title>"
//   git push

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, "..");
const POSTS_DIR = path.join(REPO_ROOT, "blog", "posts");

const args = process.argv.slice(2);
const draft = args.includes("--draft");
const titleArgs = args.filter((a) => a !== "--draft");
const title = titleArgs.join(" ").trim();

if (!title) {
  console.error("Usage: npm run new-post -- \"Your post title\" [--draft]");
  process.exit(1);
}

const slug = slugify(title);
const today = new Date().toISOString().slice(0, 10);
const filename = `${today}-${slug}.md`;
const filepath = path.join(POSTS_DIR, filename);

if (fs.existsSync(filepath)) {
  console.error(`Error: ${filename} already exists. Pick a different title or edit the existing file.`);
  process.exit(2);
}

const frontmatter = [
  "---",
  `title: "${escapeForYaml(title)}"`,
  `slug: ${slug}`,
  `date: ${today}`,
  `excerpt: ""`,
  `source: own`,
  ...(draft ? ["draft: true"] : []),
  "---",
  "",
  "Write your post here in markdown.",
  "",
  "## A subheading",
  "",
  "Body text. **Bold**, *italic*, [links](https://example.com), `inline code`,",
  "and so on.",
  "",
  "- Bullets",
  "- Like this",
  "",
  "> Blockquotes are nice for pulling out a key idea.",
  "",
].join("\n");

if (!fs.existsSync(POSTS_DIR)) fs.mkdirSync(POSTS_DIR, { recursive: true });
fs.writeFileSync(filepath, frontmatter, "utf8");

console.log("");
console.log("✓ Created", path.relative(REPO_ROOT, filepath));
console.log("  Title: ", title);
console.log("  Date:  ", today);
console.log("  Slug:  ", slug);
if (draft) console.log("  Status: DRAFT (won't appear in the blog index until you remove draft: true)");
console.log("");
console.log("Open it in your editor and write. When you're done:");
console.log(`  git add ${path.relative(REPO_ROOT, filepath)}`);
console.log(`  git commit -m "Post: ${title.slice(0, 50)}"`);
console.log("  git push");

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
