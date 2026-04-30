// src/index.js — Cloudflare Worker entry point
//
// This Worker serves static assets (the 11ty-built /blog/, the existing
// homepage, etc.) and handles two dynamic routes for the GitHub OAuth
// flow that authenticates the Decap CMS editor at /studio/:
//
//   GET /auth           — redirects to GitHub OAuth, sets CSRF cookie
//   GET /oauth/callback — verifies state, exchanges code for token,
//                         hands the token back to Decap via postMessage
//
// Static assets come from _site/ via the ASSETS binding configured in
// wrangler.jsonc. The binding is fast (Cloudflare's CDN) and free.
//
// Required env vars (set in dashboard → Settings → Variables and Secrets):
//   GITHUB_OAUTH_CLIENT_ID     — public, the OAuth App client ID
//   GITHUB_OAUTH_CLIENT_SECRET — encrypted, the OAuth App client secret

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/auth") {
      return handleAuth(request, env);
    }
    if (request.method === "GET" && url.pathname === "/oauth/callback") {
      return handleCallback(request, env);
    }

    // Everything else: serve from static assets (_site/)
    return env.ASSETS.fetch(request);
  },
};

// =====================================================================
// /auth — kicks off the OAuth flow
// =====================================================================
async function handleAuth(request, env) {
  const url = new URL(request.url);

  if (!env.GITHUB_OAUTH_CLIENT_ID) {
    return errorPage(
      "GITHUB_OAUTH_CLIENT_ID is not set. " +
      "Set it in the Worker's Settings → Variables and Secrets."
    );
  }

  const state = crypto.randomUUID();

  const ghAuthorizeUrl = new URL("https://github.com/login/oauth/authorize");
  ghAuthorizeUrl.searchParams.set("client_id", env.GITHUB_OAUTH_CLIENT_ID);
  ghAuthorizeUrl.searchParams.set("scope", "repo,user:email");
  ghAuthorizeUrl.searchParams.set("state", state);
  ghAuthorizeUrl.searchParams.set("redirect_uri", `${url.origin}/oauth/callback`);

  return new Response(null, {
    status: 302,
    headers: {
      "Location": ghAuthorizeUrl.toString(),
      "Set-Cookie": `oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
      "Cache-Control": "no-store",
    },
  });
}

// =====================================================================
// /oauth/callback — receives code from GitHub, returns token to Decap
// =====================================================================
async function handleCallback(request, env) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");
  const errorDesc = url.searchParams.get("error_description");

  if (error) {
    return oauthErrorPage(`GitHub returned: ${error}${errorDesc ? " — " + errorDesc : ""}`, url.origin);
  }
  if (!code) {
    return oauthErrorPage("Missing authorization code in callback.", url.origin);
  }

  // CSRF: state from URL must match the cookie we set in /auth
  const cookieHeader = request.headers.get("Cookie") || "";
  const cookieState = (cookieHeader.match(/(?:^|;\s*)oauth_state=([^;]+)/) || [])[1];
  if (!state || !cookieState || state !== cookieState) {
    return oauthErrorPage("State mismatch — possible CSRF. Please try logging in again.", url.origin);
  }

  if (!env.GITHUB_OAUTH_CLIENT_ID || !env.GITHUB_OAUTH_CLIENT_SECRET) {
    return oauthErrorPage(
      "OAuth env vars not set. Both GITHUB_OAUTH_CLIENT_ID and GITHUB_OAUTH_CLIENT_SECRET " +
      "must be set in Settings → Variables and Secrets.",
      url.origin
    );
  }

  let accessToken;
  try {
    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "User-Agent": "tarun.bulchandanis.com OAuth handler",
      },
      body: JSON.stringify({
        client_id: env.GITHUB_OAUTH_CLIENT_ID,
        client_secret: env.GITHUB_OAUTH_CLIENT_SECRET,
        code,
        redirect_uri: `${url.origin}/oauth/callback`,
      }),
    });

    if (!tokenRes.ok) {
      return oauthErrorPage(`Token exchange failed: HTTP ${tokenRes.status}`, url.origin);
    }
    const tokenData = await tokenRes.json();
    if (tokenData.error) {
      return oauthErrorPage(`GitHub: ${tokenData.error_description || tokenData.error}`, url.origin);
    }
    accessToken = tokenData.access_token;
  } catch (err) {
    return oauthErrorPage(`Network error during token exchange: ${err.message}`, url.origin);
  }

  if (!accessToken) {
    return oauthErrorPage("No access token returned by GitHub.", url.origin);
  }

  // Fetch GitHub user info so we can build a complete Decap user object.
  // (Decap stores this in localStorage and uses it to skip the login flow
  // on subsequent loads.)
  let ghUser = null;
  try {
    const userRes = await fetch("https://api.github.com/user", {
      headers: {
        "Authorization": "Bearer " + accessToken,
        "Accept": "application/vnd.github+json",
        "User-Agent": "tarun.bulchandanis.com OAuth handler",
      },
    });
    if (userRes.ok) ghUser = await userRes.json();
  } catch (err) {
    // Non-fatal — Decap can work with token-only, just won't show the name.
  }

  const userPayload = {
    token: accessToken,
    backendName: "github",
    ...(ghUser && {
      login: ghUser.login,
      name: ghUser.name || ghUser.login,
      email: ghUser.email,
      avatar_url: ghUser.avatar_url,
    }),
  };

  // Decap expects this exact message format from the popup
  const successMessage = `authorization:github:success:${JSON.stringify(userPayload)}`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Signed in</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; padding: 40px; text-align: center; color: #333; max-width: 480px; margin: 0 auto; }
    h1 { font-size: 20px; margin-bottom: 8px; }
    p { color: #666; font-size: 14px; }
    .spinner { display: inline-block; width: 24px; height: 24px; border: 3px solid #eee; border-top-color: hsl(187, 74%, 32%); border-radius: 50%; animation: spin 0.8s linear infinite; margin-bottom: 16px; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .debug { margin-top: 24px; font-size: 11px; color: #aaa; font-family: monospace; }
    button { margin-top: 16px; padding: 8px 16px; font-size: 13px; cursor: pointer; }
  </style>
</head>
<body>
  <div class="spinner" aria-hidden="true"></div>
  <h1>Signing you in…</h1>
  <p>You can close this window if it doesn't close automatically.</p>
  <button id="manualClose" type="button" style="display:none">Close window manually</button>
  <div class="debug" id="debug"></div>
  <script>
    (function() {
      var message = ${JSON.stringify(successMessage)};
      var userPayload = ${JSON.stringify(userPayload)};
      function log(s) {
        var d = document.getElementById("debug");
        if (d) d.textContent += s + "\\n";
      }

      // PRIMARY MECHANISM: write Decap's user object to localStorage. The
      // popup is same-origin as the opener (/studio/), so localStorage is
      // shared. Decap reads this on page load — if it's there, no login
      // popup needed. This sidesteps Safari's broken postMessage delivery
      // to Decap's listener.
      try {
        localStorage.setItem("decap-cms-user", JSON.stringify(userPayload));
        // Some older Decap versions used the netlify-cms key name.
        localStorage.setItem("netlify-cms-user", JSON.stringify(userPayload));
        log("stored user in localStorage");
      } catch (err) {
        log("localStorage error: " + err.message);
      }

      // SECONDARY MECHANISM: the standard postMessage flow (works on most
      // browser/Decap combos but Safari + Decap 3.8.4 has trouble).
      function send() {
        try {
          if (window.opener && window.opener !== window) {
            window.opener.postMessage(message, "*");
            log("posted at " + new Date().toISOString());
          } else {
            log("no opener");
          }
        } catch (err) { log("postMessage error: " + err.message); }
      }
      window.addEventListener("message", function(e) {
        if (e.data === "authorizing:github") {
          log("got authorizing:github from " + e.origin);
          send();
        }
      });
      send();

      // After a brief grace period for postMessage, force-reload the opener
      // so Decap re-initializes and reads the new user from localStorage.
      // Wrapped in try/catch because Safari may throw on opener access if
      // it's been navigated; the message above is the fallback in that case.
      setTimeout(function() {
        try {
          if (window.opener && !window.opener.closed) {
            window.opener.location.reload();
            log("reloaded opener");
          }
        } catch (err) { log("opener reload failed: " + err.message); }
        // Close the popup
        setTimeout(function() {
          window.close();
          setTimeout(function() {
            if (!window.closed) {
              var btn = document.getElementById("manualClose");
              if (btn) {
                btn.style.display = "inline-block";
                btn.onclick = function() { window.close(); };
              }
            }
          }, 600);
        }, 800);
      }, 1500);

      // Keep posting for a while in case postMessage works
      var attempts = 0;
      var interval = setInterval(function() {
        send();
        if (++attempts >= 4) clearInterval(interval);
      }, 350);
    })();
  </script>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      // Allow this popup to communicate with its opener (the /studio/ window).
      // Safari defaults to a stricter COOP that can isolate the popup; this
      // explicitly opts back in so window.opener.postMessage works.
      "Cross-Origin-Opener-Policy": "unsafe-none",
      "Cross-Origin-Embedder-Policy": "unsafe-none",
      "Set-Cookie": `oauth_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`,
    },
  });
}

// =====================================================================
// Error pages
// =====================================================================
function errorPage(message) {
  const safe = String(message).replace(/[<>&]/g, c => ({"<":"&lt;",">":"&gt;","&":"&amp;"})[c]);
  return new Response(
    `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Configuration error</title>
    <style>body{font-family:system-ui;padding:40px;max-width:520px;margin:0 auto;color:#333}
    h1{color:#c00;font-size:20px}code{background:#f4f4f4;padding:8px 12px;border-radius:4px;display:block;margin-top:14px;font-size:13px;word-break:break-word}</style>
    </head><body><h1>Authorization not configured</h1><code>${safe}</code></body></html>`,
    { status: 500, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } }
  );
}

function oauthErrorPage(message, origin) {
  const safeMessage = String(message).replace(/[<>&]/g, c => ({"<":"&lt;",">":"&gt;","&":"&amp;"})[c]);
  const errorPayload = JSON.stringify({ message });
  const errorMessage = `authorization:github:error:${errorPayload}`;
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Sign-in error</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; padding: 40px; text-align: center; color: #333; max-width: 520px; margin: 0 auto; }
    h1 { color: #c00; font-size: 20px; margin-bottom: 12px; }
    p { color: #666; font-size: 14px; line-height: 1.55; }
    code { background: #f4f4f4; padding: 8px 12px; border-radius: 4px; display: inline-block; margin-top: 14px; font-size: 13px; word-break: break-word; max-width: 100%; }
    a { color: hsl(187, 74%, 32%); }
  </style>
</head>
<body>
  <h1>Sign-in error</h1>
  <p>Something went wrong while signing you in to the blog editor.</p>
  <code>${safeMessage}</code>
  <p style="margin-top:24px;"><a href="/studio/">Back to the editor</a></p>
  <script>
    (function() {
      try {
        if (window.opener && window.opener !== window) {
          window.opener.postMessage(${JSON.stringify(errorMessage)}, ${JSON.stringify(origin || "*")});
        }
      } catch (e) {}
    })();
  </script>
</body>
</html>`;
  return new Response(html, {
    status: 400,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}
