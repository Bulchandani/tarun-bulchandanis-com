# Cloudflare Pages Functions

Server-side handlers that run on Cloudflare's edge alongside the static site.
This directory contains the GitHub OAuth flow that authenticates the Decap
CMS editor at `/studio/`.

## Routes

| URL | File | Purpose |
|---|---|---|
| `/auth` | `auth.js` | Decap opens this in a popup. Sets a CSRF state cookie, redirects to GitHub OAuth. |
| `/oauth/callback` | `oauth/callback.js` | GitHub redirects here after auth. Exchanges code for access token, posts token back to Decap via `window.opener.postMessage()`. |

## Required environment variables

Set these in Cloudflare Pages → **Settings → Environment variables**.
**Mark them as encrypted** (toggle the lock icon).

| Variable | Where it comes from | Sensitive? |
|---|---|---|
| `GITHUB_OAUTH_CLIENT_ID` | GitHub OAuth App settings (`tarun-blog-bot` account) | No (public ID) |
| `GITHUB_OAUTH_CLIENT_SECRET` | GitHub OAuth App settings — generated client secret | **Yes** — never commit, never share |

After adding env vars, **redeploy** for them to take effect (push any commit
or click "Retry deployment" in the dashboard).

## Security notes

- The state cookie (`oauth_state`) protects against CSRF — a request to
  `/oauth/callback` with a state that doesn't match the cookie is rejected.
- The cookie is `HttpOnly`, `Secure`, `SameSite=Lax`, 10-minute lifetime.
- The access token is **not** stored server-side. We hand it to Decap via
  `postMessage` and Decap stores it in `localStorage`.
- The OAuth App is owned by the `tarun-blog-bot` account, which only has
  Write access to one repo. If the token leaks, blast radius is one repo.

## Local testing

```bash
# Install Wrangler if you don't have it
npm install -g wrangler

# Create a local .dev.vars file (gitignored)
cat > .dev.vars <<EOF
GITHUB_OAUTH_CLIENT_ID=Ov23liynJm8y4YMMCpoy
GITHUB_OAUTH_CLIENT_SECRET=<your-secret-here>
EOF

# Run the site + functions locally
wrangler pages dev _site
```

Visit `http://localhost:8788/auth` — it should redirect you to GitHub.

> Note: GitHub's registered callback URL is the production one
> (`https://tarun.bulchandanis.com/oauth/callback`), so the full local
> flow won't complete unless you register a separate dev OAuth App. For
> most edits to these handlers, eyeballing the redirect URL and reading
> logs is enough.
