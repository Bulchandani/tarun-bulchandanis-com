// /auth — Cloudflare Pages Function
//
// Decap CMS opens this URL in a popup when the user clicks
// "Login with GitHub" in the studio. We:
//   1. Generate a random state token (CSRF protection)
//   2. Store it in an HttpOnly cookie
//   3. Redirect to GitHub's OAuth authorize endpoint with the state
//
// Env vars used (set in Cloudflare Pages dashboard, not in code):
//   GITHUB_OAUTH_CLIENT_ID — the OAuth App's public client ID

export async function onRequestGet(context) {
  const { env, request } = context;
  const url = new URL(request.url);

  if (!env.GITHUB_OAUTH_CLIENT_ID) {
    return errorPage(
      "GITHUB_OAUTH_CLIENT_ID is not set. " +
      "Set it in Cloudflare Pages → Settings → Environment variables."
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

function errorPage(message) {
  const safe = String(message).replace(/[<>&]/g, c => ({"<":"&lt;",">":"&gt;","&":"&amp;"})[c]);
  return new Response(
    `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Configuration error</title>
    <style>body{font-family:system-ui;padding:40px;max-width:520px;margin:0 auto;color:#333}
    h1{color:#c00;font-size:20px}code{background:#f4f4f4;padding:8px 12px;border-radius:4px;display:block;margin-top:14px;font-size:13px}</style>
    </head><body><h1>Authorization not configured</h1><code>${safe}</code></body></html>`,
    { status: 500, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } }
  );
}
