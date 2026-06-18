import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, subject, message } = await req.json();

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to:   "thomas.i.sloane@gmail.com",
    replyTo: email,
    subject: `[Portfolio] ${subject}`,
    text: `From: ${name} <${email}>\n\n${message}`,
    html: `
      <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <hr />
      <p style="white-space:pre-wrap">${message.replace(/</g, "&lt;")}</p>
    `,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
