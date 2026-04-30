# tarun.bulchandanis.com

Personal portfolio for Tarun Bulchandani. **Pure static site** — vanilla HTML / CSS / JS, single file, no build step, no backend. Hosts cleanly on GitHub Pages, Cloudflare Pages, Netlify, or any static host.

## Structure

```
tarun-site/
├── index.html              Single-page site (HTML + embedded CSS + JS)
├── assets/
│   └── headshot.jpg
├── downloads/
│   ├── cv-tarun-bulchandani-ai-architect.pdf
│   ├── cv-tarun-bulchandani-chief-architect.pdf
│   └── cv-tarun-bulchandani-governance.pdf
├── CNAME                   Custom domain for GitHub Pages
├── .gitignore
└── README.md
```

## Local preview

No tooling needed. Either open `index.html` directly in a browser, or run a static server from this directory:

```bash
# Python 3 (almost always pre-installed on macOS / Linux)
python3 -m http.server 5500
# → http://localhost:5500

# Node (if installed)
npx serve .
```

## Deploy to GitHub Pages

This is the recommended path.

1. **Push to GitHub** (replace `YOUR-USERNAME` with your GitHub handle):

   ```bash
   git init
   git add .
   git commit -m "Initial site"
   gh repo create YOUR-USERNAME/tarun-bulchandanis-com --private --source=. --remote=origin --push
   ```

   Or, if you prefer the manual route:

   ```bash
   git remote add origin git@github.com:YOUR-USERNAME/tarun-bulchandanis-com.git
   git branch -M main
   git push -u origin main
   ```

2. **Enable Pages.** Repo → Settings → Pages → Source: `main` branch, root folder.

3. **Wire the domain.** The `CNAME` file in this repo already targets `tarun.bulchandanis.com`. At your DNS provider for `bulchandanis.com`, add a CNAME record:

   - Name: `tarun`
   - Target: `YOUR-USERNAME.github.io`

4. **Wait 5-15 min** for DNS propagation and GitHub to issue an SSL cert. Site lives at `https://tarun.bulchandanis.com`.

## Alternative hosts (drop-in replacements)

All of these work as-is — push the repo, point the domain.

- **Cloudflare Pages.** Connect to GitHub. No build command. Custom domain in dashboard.
- **Vercel.** Import the GitHub repo. Framework preset: `Other`. No build command. Custom domain in Project Settings.
- **Netlify.** Drag-and-drop the folder onto the dashboard, or connect the GitHub repo. Custom domain in Site Settings.

## Updating content

- **Page copy / structure:** edit `index.html`. Push. Live in ~30s on Pages.
- **CV PDFs:** replace files in `downloads/` keeping the same filenames. Push.
- **Headshot:** replace `assets/headshot.jpg` keeping the same path.

## Family multi-tenant plan

Root `bulchandanis.com` is reserved for a family hub. Each person gets their own subdomain:

- `tarun.bulchandanis.com` — this site.
- `rhea.bulchandanis.com` — future.
- `reyna.bulchandanis.com` — future.

Each subdomain is its own independent project — fork this folder, re-skin per person, deploy as a sibling repo with its own custom domain.

## v2 ideas (out of scope for v1)

- Add a `/posts/` section for short-form writing on architecture, AI in regulated environments, governance.
- A Meridian case-study deep dive page.
- An `og-image.png` for richer social previews.
- Add Rhea / Reyna sites under sibling subdomains.
