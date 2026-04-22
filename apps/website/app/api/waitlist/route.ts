import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseServer } from "@/lib/supabase-server";

export async function POST(request: Request) {
  try {
    const { first_name, email } = await request.json();

    if (!email || !first_name) {
      return NextResponse.json(
        { error: "First name and email are required" },
        { status: 400 }
      );
    }

    const { error: dbError } = await supabaseServer
      .from("waitlist")
      .insert({ first_name, email });

    if (dbError) {
      // 23505 = unique_violation (duplicate email)
      if (dbError.code === "23505") {
        return NextResponse.json({ alreadySignedUp: true });
      }
      throw dbError;
    }

    // Fire thank-you email without blocking the response
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      resend.emails.send({
        from: "LatchClub <info@latchclub.ca>",
        to: email,
        subject: "You're on the LatchClub waitlist",
        html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>You're on the LatchClub waitlist</title></head>
<body style="margin:0;padding:0;background-color:#0f1a22;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
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
                Hey ${first_name},<br>you're in. 🎉
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
          <p style="margin:0 0 6px;font-size:12px;color:#2A3F4A;">© 2026 LatchClub · Toronto, Canada</p>
          <p style="margin:0;font-size:12px;color:#2A3F4A;">
            <a href="https://latchclub.ca" style="color:#03A493;text-decoration:none;">latchclub.ca</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
      }).catch(() => {});
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
