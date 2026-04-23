import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseServer } from "@/lib/supabase-server";

export async function POST(request: Request) {
  try {
    const { first_name, email } = await request.json();

    if (!email || !first_name) {
      return NextResponse.json(
        { error: "First name and email are required" },
        { status: 400 }
      );
    }

    const { error: dbError } = await getSupabaseServer()
      .from("waitlist")
      .insert({ first_name, email });

    if (dbError) {
      // 23505 = unique_violation (duplicate email)
      if (dbError.code === "23505") {
        return NextResponse.json({ alreadySignedUp: true });
      }
      throw dbError;
    }

    // Await the thank-you email so Vercel's serverless runtime doesn't
    // terminate the function before the request to Resend completes.
    // (Fire-and-forget promises get killed when the response is returned.)
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      try {
        // Plain-text alternative. Gmail's spam filter heavily weights
        // multipart/alternative — HTML-only emails from new domains land in
        // spam. See Gmail Feb 2024 bulk-sender guidelines.
        const textBody = `Hey ${first_name},

You're in.

Thanks for joining the LatchClub waitlist. You'll be among the first to unlock exclusive deals at the best local spots in Toronto.

We're building something special for people who want more from their city — better access, better deals, and a smarter way to explore.

— The LatchClub team
https://latchclub.ca

---
You're receiving this because you joined the waitlist at latchclub.ca.
To unsubscribe, reply to this email with "unsubscribe" or email corporate@latchclub.ca.
`;

        const { error: emailError } = await resend.emails.send({
          // Send from the Resend-verified apex latchclub.ca. Resend's DKIM
          // key at resend._domainkey.latchclub.ca signs every outbound message,
          // and our DMARC (p=quarantine; adkim=r) passes on DKIM alignment
          // alone even though apex SPF routes mail via secureserver. Duplicate
          // DMARC record at GoDaddy is now cleaned up and DKIM alignment is
          // the authoritative auth signal for EOP.
          // NOTE: send.latchclub.ca is Resend's bounce subdomain — using it
          // as From returns a 403 "domain is not verified" from Resend.
          from: "LatchClub <info@latchclub.ca>",
          to: email,
          replyTo: "corporate@latchclub.ca",
          subject: "You're on the LatchClub waitlist",
          text: textBody,
          // RFC 2369 List-Unsubscribe header. Gmail's Feb 2024 bulk-sender
          // guidelines expect this even for transactional mail; without it,
          // new-domain emails are likely to land in spam. Mailto form is
          // sufficient for sub-5K/day volume; Gmail will render an
          // "Unsubscribe" button that opens a pre-filled email to corporate@.
          headers: {
            "List-Unsubscribe": "<mailto:corporate@latchclub.ca?subject=Unsubscribe>",
          },
          html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>You're on the LatchClub waitlist</title></head>
<body style="margin:0;padding:0;background-color:#0f1a22;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <!-- Preheader (hidden, shown as inbox preview text) -->
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:#0f1a22;opacity:0;">
    Early access to Toronto's best local spots — you're in.
  </div>
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f1a22;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

        <!-- Logo -->
        <tr><td align="center" style="padding-bottom:32px;">
          <table cellpadding="0" cellspacing="0"><tr>
            <td style="background-color:#F5F7F7;border-radius:10px;width:36px;height:36px;text-align:center;vertical-align:middle;overflow:hidden;">
              <img src="https://latchclub.ca/logo.png" width="36" height="36" alt="LatchClub" style="display:block;border-radius:10px;" />
            </td>
            <td style="padding-left:10px;vertical-align:middle;">
              <span style="font-size:20px;font-weight:700;color:#F5F7F7;letter-spacing:-0.3px;">LatchClub</span>
            </td>
          </tr></table>
        </td></tr>

        <!-- Card -->
        <tr><td style="background-color:#162028;border-radius:16px;overflow:hidden;">

          <!-- Teal top bar -->
          <table width="100%" cellpadding="0" cellspacing="0"><tr>
            <td style="background:linear-gradient(90deg,#03A493,#4DBCAE);height:3px;font-size:0;line-height:0;">&nbsp;</td>
          </tr></table>

          <!-- Body -->
          <table width="100%" cellpadding="0" cellspacing="0"><tr>
            <td style="padding:40px 40px 36px;">

              <!-- Eyebrow -->
              <p style="margin:0 0 20px;font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:#03A493;">Waitlist Confirmed</p>

              <!-- Headline -->
              <h1 style="margin:0 0 20px;font-size:28px;font-weight:700;color:#F5F7F7;line-height:1.2;letter-spacing:-0.5px;">
                Hey ${first_name},<br>you're in.
              </h1>

              <!-- Divider -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;"><tr>
                <td style="background-color:#1E2D36;height:1px;font-size:0;">&nbsp;</td>
              </tr></table>

              <!-- Body copy -->
              <p style="margin:0 0 16px;font-size:15px;line-height:1.75;color:#94a9b0;">
                Thanks for joining the LatchClub waitlist. You'll be among the first to unlock exclusive deals at the best local spots in Toronto.
              </p>
              <p style="margin:0 0 32px;font-size:15px;line-height:1.75;color:#94a9b0;">
                We're building something special for people who want more from their city — better access, better deals, and a smarter way to explore.
              </p>


            </td>
          </tr></table>


        </td></tr>

        <!-- Footer -->
        <tr><td align="center" style="padding-top:28px;">
          <p style="margin:0 0 6px;font-size:12px;color:#94a9b0;">© 2026 LatchClub · Toronto, Canada</p>
          <p style="margin:0 0 14px;font-size:12px;color:#94a9b0;">
            <a href="https://latchclub.ca" style="color:#03A493;text-decoration:none;">latchclub.ca</a>
          </p>
          <!-- Visible unsubscribe: required to match the List-Unsubscribe header.
               Gmail flags emails whose header-declared unsubscribe isn't also
               visible to the user. -->
          <p style="margin:0;font-size:11px;color:#5a6d75;line-height:1.6;">
            You're receiving this because you joined our waitlist at latchclub.ca.<br>
            Don't want these emails?
            <a href="mailto:corporate@latchclub.ca?subject=Unsubscribe" style="color:#5a6d75;text-decoration:underline;">Unsubscribe</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
        });
        if (emailError) {
          console.error("[waitlist] resend returned error:", emailError);
        }
      } catch (err) {
        // Don't fail the signup if the email bounces — the user is already
        // saved in Supabase. Just surface the error in Vercel logs.
        console.error("[waitlist] resend email failed:", err);
      }
    } else {
      console.warn("[waitlist] RESEND_API_KEY not set — skipping email");
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[waitlist] POST handler failed:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
