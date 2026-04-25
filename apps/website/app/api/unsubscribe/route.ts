import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase-server";
import { verifyToken } from "@/lib/unsubscribe-token";

export const dynamic = "force-dynamic";

async function unsubscribe(email: string, token: string) {
  if (!email || !token || !verifyToken(email, token)) {
    return { ok: false, status: 400 as const };
  }
  // RLS on `waitlist` blocks anon UPDATEs, so we go through a
  // security-definer RPC that scopes the mutation to setting
  // unsubscribed_at on the row matching the email.
  const { error } = await getSupabaseServer().rpc("unsubscribe_waitlist", {
    p_email: email.trim().toLowerCase(),
  });
  if (error) {
    console.error("[unsubscribe] supabase rpc failed:", error);
    return { ok: false, status: 500 as const };
  }
  return { ok: true, status: 200 as const };
}

export async function POST(request: Request) {
  // RFC 8058 one-click unsubscribe. Mail clients POST here when the user
  // hits the inline "Unsubscribe" button. We accept either query string
  // params (matches the URL in the List-Unsubscribe header) or a form body.
  const url = new URL(request.url);
  let email = url.searchParams.get("email") || "";
  let token = url.searchParams.get("token") || "";

  if (!email || !token) {
    try {
      const ct = request.headers.get("content-type") || "";
      if (ct.includes("application/x-www-form-urlencoded")) {
        const form = await request.formData();
        email = email || String(form.get("email") || "");
        token = token || String(form.get("token") || "");
      } else if (ct.includes("application/json")) {
        const body = await request.json();
        email = email || body.email || "";
        token = token || body.token || "";
      }
    } catch {
      // fall through
    }
  }

  const { status } = await unsubscribe(email, token);
  return new NextResponse(null, { status });
}

export async function GET(request: Request) {
  // Browser fallback. If a recipient clicks the visible "Unsubscribe" link
  // in the email body, they hit this and we render a confirmation page.
  const url = new URL(request.url);
  const email = url.searchParams.get("email") || "";
  const token = url.searchParams.get("token") || "";
  const { ok } = await unsubscribe(email, token);

  const title = ok ? "Unsubscribed" : "Unable to unsubscribe";
  const body = ok
    ? "You've been removed from the LatchClub waitlist. We're sorry to see you go."
    : "We couldn't process this unsubscribe link. It may have expired or been mistyped. Email corporate@latchclub.ca and we'll take care of it.";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${title} · LatchClub</title>
  <style>
    body { margin:0; background:#0f1a22; color:#F5F7F7; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; min-height:100vh; display:grid; place-items:center; padding:24px; }
    .card { max-width:480px; background:#162028; border-radius:16px; padding:36px 32px; text-align:center; border-top:3px solid #03A493; }
    h1 { margin:0 0 12px; font-size:22px; font-weight:700; letter-spacing:-0.3px; }
    p { margin:0 0 18px; font-size:14px; line-height:1.6; color:#94a9b0; }
    a { color:#03A493; text-decoration:none; font-size:13px; }
  </style>
</head>
<body>
  <div class="card">
    <h1>${title}</h1>
    <p>${body}</p>
    <a href="https://latchclub.ca">latchclub.ca</a>
  </div>
</body>
</html>`;

  return new NextResponse(html, {
    status: ok ? 200 : 400,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
