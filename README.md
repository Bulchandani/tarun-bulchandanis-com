# tarun.bulchandanis.com

Personal portfolio + blog for Tarun Bulchandani.

- **Homepage** at `/` — hand-coded HTML/CSS/JS in `index.html`. No framework.
- **Blog** at `/blog/` — markdown files compiled to HTML by [Eleventy](https://www.11ty.dev/).
- **CMS** (planned) at `/studio/` — [Decap CMS](https://decapcms.org/) editor authenticated against GitHub via OAuth.
- **Hosting** — Cloudflare Worker with static assets binding. The Worker also handles the OAuth flow for Decap (`/auth`, `/oauth/callback`).

## Setup on a fresh machine

```bash
# 1. Clone
gh repo clone Bulchandani/tarun-bulchandanis-com
cd tarun-bulchandanis-com

# 2. Install dependencies (Node 20+ recommended)
npm install

# 3. Build the site
npm run build
# → output goes to _site/, deployed to Cloudflare on git push
```

That's it. Everything else (writing posts, deploying) flows through git commits.

## Writing posts

Two kinds: **your own writing** (lives in this repo), or **LinkedIn articles** (link out to LinkedIn, hosted there).

### Your own writing

```bash
npm run new-post -- "Architecture under uncertainty"
```

Creates `blog/posts/YYYY-MM-DD-architecture-under-uncertainty.md` with frontmatter pre-filled. Open it, write your post, then:

```bash
git add blog/posts/
git commit -m "Post: Architecture under uncertainty"
git push
```

Cloudflare rebuilds in ~30s and the post is live.

If you want to draft a post without publishing it yet, add `--draft`:

```bash
npm run new-post -- "Half-finished idea" --draft
```

Drafts get `draft: true` in their frontmatter and the blog index filters them out. Remove that line when you're ready to publish.

### LinkedIn articles

Single article:

```bash
npm run add-linkedin -- https://www.linkedin.com/pulse/your-article-slug
```

Multiple at once:

```bash
npm run add-linkedin -- \
  https://www.linkedin.com/pulse/article-1 \
  https://www.linkedin.com/pulse/article-2
```

Bulk from a file (the canonical list of imported articles lives at `data/linkedin-articles.txt`):

```bash
# Add new URL(s) to data/linkedin-articles.txt, then:
npm run add-linkedin -- --from-file data/linkedin-articles.txt
```

The script:

- Fetches each LinkedIn URL
- Pulls title, excerpt, hero image, and **published date** (from JSON-LD or the og:image timestamp — LinkedIn doesn't expose `article:published_time` in OG tags)
- Writes a markdown file under `blog/posts/{published-date}-linkedin-{slug}.md`
- Marks the post with `source: linkedin` so the blog index renders it as an outbound link to LinkedIn (we don't host LinkedIn's article body)
- Skips URLs that already have a post (re-running is safe)

Then:

```bash
git add blog/posts/ data/linkedin-articles.txt
git commit -m "Add LinkedIn posts"
git push
```

## Local development

```bash
# Serve the blog locally with hot reload
npm run dev
# → http://localhost:8080
# Visit http://localhost:8080/blog/ for the blog index
```

If you want to test the Cloudflare Worker (OAuth handlers) locally too:

```bash
# Build first
npm run build

# Then run with wrangler (the Worker proxy)
npm run preview
# → http://localhost:8787
```

`npm run preview` requires `.dev.vars` in the repo root with the OAuth secrets:

```
GITHUB_OAUTH_CLIENT_ID=Ov23liynJm8y4YMMCpoy
GITHUB_OAUTH_CLIENT_SECRET=<paste-from-password-manager>
```

`.dev.vars` is gitignored — never commit it.

## Deploy

Deploys are automatic on every push to `main`:

1. Push to GitHub
2. Cloudflare's GitHub integration runs `npm install && wrangler deploy`
3. The `build.command` in `wrangler.jsonc` triggers `npm run build` first
4. Wrangler bundles `src/index.js` (the Worker) and uploads `_site/` (the static assets)
5. Live in ~60s at `https://tarun.bulchandanis.com`

To deploy manually from the command line:

```bash
npx wrangler login   # one-time, opens browser
npm run deploy       # build + deploy
```

## Architecture

```
Request to tarun.bulchandanis.com
   │
   ▼
src/index.js (Cloudflare Worker)
   │
   ├── /auth             → redirects to GitHub OAuth
   ├── /oauth/callback   → exchanges code for token, returns to Decap
   └── (everything else) → env.ASSETS.fetch() → _site/
                                                  │
                                                  ├── index.html        (homepage, hand-coded)
                                                  ├── blog/index.html   (built by 11ty)
                                                  ├── blog/{slug}/      (each post)
                                                  └── assets/, downloads/
```

Build pipeline:

```
git push origin main
   │
   ▼
Cloudflare's GitHub integration
   │
   ▼
npm install
   │
   ▼
npm run build       (Eleventy → _site/)
   │
   ▼
wrangler deploy     (uploads src/index.js + _site/)
```

## File map

```
.
├── index.html                        Homepage (hand-coded HTML/CSS/JS)
├── blog/
│   ├── index.njk                     Blog index template
│   ├── blog.css                      Blog styles
│   └── posts/
│       ├── posts.11tydata.json       Default frontmatter for all posts
│       ├── 2026-04-30-welcome.md     Your own posts
│       └── 2023-05-…-linkedin-….md   Imported from LinkedIn
├── _includes/layouts/
│   ├── base.njk                      Shared head/header/footer
│   ├── blog-index.njk                Wraps the post list page
│   └── post.njk                      Wraps a single post
├── src/
│   └── index.js                      Cloudflare Worker entry point
├── scripts/
│   ├── new-post.mjs                  npm run new-post
│   └── add-linkedin.mjs              npm run add-linkedin
├── data/
│   └── linkedin-articles.txt         List of imported LinkedIn URLs (canonical)
├── assets/
│   └── headshot.jpg
├── downloads/
│   └── cv-*.pdf
├── .eleventy.js                      Eleventy build config
├── .eleventyignore
├── wrangler.jsonc                    Cloudflare Worker config
├── package.json
└── CNAME                             tarun.bulchandanis.com
```

## OAuth / Decap CMS notes

The Worker handles two routes for the (planned) Decap admin UI:

- `GET /auth` — sets a CSRF state cookie, redirects to GitHub OAuth
- `GET /oauth/callback` — verifies state, exchanges code for token, posts the token back to Decap via `window.opener.postMessage()`

**Required env vars** (set in Cloudflare dashboard → Worker → Settings → Variables and Secrets):

| Variable | Description | Sensitive |
|---|---|---|
| `GITHUB_OAUTH_CLIENT_ID` | OAuth App client ID (from `tarun-blog-bot` GitHub account) | No |
| `GITHUB_OAUTH_CLIENT_SECRET` | OAuth App client secret | **Yes — encrypt** |

Both must be set on the Worker. After changing them, redeploy for the Worker to pick up the new values.

The OAuth App is owned by a dedicated `tarun-blog-bot` GitHub account that has Write access to this repo only. If a token leaks, the blast radius is one repo.

## Family multi-tenant

Root `bulchandanis.com` is the family hub. Each person has their own subdomain, hosted from their own repo:

- `tarun.bulchandanis.com` — this repo
- `rhea.bulchandanis.com` — `Bulchandani/rhea-bulchandanis-com`
- `reyna.bulchandanis.com` — `Bulchandani/reyna-bulchandanis-com`

Each is independently deployed. The blog scaffold here can be replicated to other repos when they want one.
