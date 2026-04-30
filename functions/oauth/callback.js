// /oauth/callback — Cloudflare Pages Function
//
// GitHub redirects here after the user authorizes the OAuth App.
// We:
//   1. Verify the state cookie matches the URL state (CSRF check)
//   2. Exchange the auth code for a GitHub access token
//   3. Return HTML that posts the token back to the parent window (Decap CMS)
//      using window.opener.postMessage()
//
// Env vars used (set in Cloudflare Pages dashboard, not in code):
//   GITHUB_OAUTH_CLIENT_ID     — the OAuth App's client ID (public)
//   GITHUB_OAUTH_CLIENT_SECRET — the OAuth App's client secret (sensitive!)

export async function onRequestGet(context) {
  const { env, request } = context;
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");
  const errorDesc = url.searchParams.get("error_description");

  if (error) {
    return errorPage(`GitHub returned: ${error}${errorDesc ? " — " + errorDesc : ""}`, url.origin);
  }
  if (!code) {
    return errorPage("Missing authorization code in callback.", url.origin);
  }

  // CSRF: state from URL must match the state we set in the cookie at /auth
  const cookieHeader = request.headers.get("Cookie") || "";
  const cookieState = (cookieHeader.match(/(?:^|;\s*)oauth_state=([^;]+)/) || [])[1];
  if (!state || !cookieState || state !== cookieState) {
    return errorPage("State mismatch — possible CSRF. Please try logging in again.", url.origin);
  }

  if (!env.GITHUB_OAUTH_CLIENT_ID || !env.GITHUB_OAUTH_CLIENT_SECRET) {
    return errorPage(
      "OAuth env vars not set. Both GITHUB_OAUTH_CLIENT_ID and GITHUB_OAUTH_CLIENT_SECRET " +
      "must be configured in Cloudflare Pages → Settings → Environment variables.",
      url.origin
    );
  }

  // Exchange the code for an access token
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
      return errorPage(`Token exchange failed: HTTP ${tokenRes.status}`, url.origin);
    }
    const tokenData = await tokenRes.json();
    if (tokenData.error) {
      return errorPage(`GitHub: ${tokenData.error_description || tokenData.error}`, url.origin);
    }
    accessToken = tokenData.access_token;
  } catch (err) {
    return errorPage(`Network error during token exchange: ${err.message}`, url.origin);
  }

  if (!accessToken) {
    return errorPage("No access token returned by GitHub.", url.origin);
  }

  // Decap expects this exact message format from the popup
  const successPayload = JSON.stringify({ token: accessToken, provider: "github" });
  const successMessage = `authorization:github:success:${successPayload}`;

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
  </style>
</head>
<body>
  <div class="spinner" aria-hidden="true"></div>
  <h1>Signing you in…</h1>
  <p>You can close this window if it doesn't close automatically.</p>
  <script>
    (function() {
      var message = ${JSON.stringify(successMessage)};
      var targetOrigin = ${JSON.stringify(url.origin)};
      function send() {
        if (window.opener && window.opener !== window) {
          window.opener.postMessage(message, targetOrigin);
        }
      }
      // Decap sends "authorizing:github" once it's listening; reply when we see it
      window.addEventListener("message", function(e) {
        if (e.data === "authorizing:github") send();
      });
      // Also send immediately in case Decap is already waiting
      send();
      // Re-send a few times to handle race conditions, then close
      var attempts = 0;
      var interval = setInterval(function() {
        send();
        if (++attempts >= 5) { clearInterval(interval); window.close(); }
      }, 400);
    })();
  </script>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      // Wipe the state cookie now that we're done with it
      "Set-Cookie": `oauth_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`,
    },
  });
}

function errorPage(message, origin) {
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
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
