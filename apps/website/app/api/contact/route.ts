import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "LatchClub Contact <info@latchclub.ca>",
      to: "corporate@latchclub.ca",
      replyTo: email,
      subject: `New message from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#111;">
          <h2 style="font-size:20px;font-weight:600;margin-bottom:4px;">New contact form submission</h2>
          <p style="color:#888;font-size:13px;margin-top:0;margin-bottom:24px;">Sent via latchclub.ca/contact</p>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #eee;color:#555;width:80px;">Name</td>
              <td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:500;">${name}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #eee;color:#555;">Email</td>
              <td style="padding:10px 0;border-bottom:1px solid #eee;">
                <a href="mailto:${email}" style="color:#03A493;text-decoration:none;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 0;color:#555;vertical-align:top;">Message</td>
              <td style="padding:10px 0;line-height:1.6;white-space:pre-wrap;">${message}</td>
            </tr>
          </table>
          <p style="margin-top:32px;font-size:12px;color:#bbb;">Hit reply to respond directly to ${name}.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
