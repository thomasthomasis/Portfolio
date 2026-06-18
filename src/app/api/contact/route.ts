import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

// ── Simple in-memory rate limiter ────────────────────────────────────────────
// Allows 3 submissions per IP per hour.
// Works per serverless instance (good enough for a portfolio contact form).
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const LIMIT    = 3;
const WINDOW   = 60 * 60 * 1000; // 1 hour in ms

function isRateLimited(ip: string): boolean {
  const now   = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + WINDOW });
    return false;
  }

  if (entry.count >= LIMIT) return true;

  entry.count++;
  return false;
}

function getIP(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "anonymous"
  );
}

export async function POST(req: Request) {
  const ip = getIP(req);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages. Please try again later." },
      { status: 429 }
    );
  }

  const { name, email, subject, message } = await req.json();

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from:    "Portfolio Contact <onboarding@resend.dev>",
    to:      "thomas.i.sloane@gmail.com",
    replyTo: email,
    subject: `[Portfolio] ${subject}`,
    text:    `From: ${name} <${email}>\n\n${message}`,
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
