import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "info@meagle360.com";

export async function POST(request: Request) {
  let body: {
    name?: string;
    phone?: string;
    users?: string;
    message?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const phone = (body.phone || "").trim();
  const users = (body.users || "").trim();
  const message = (body.message || "").trim();

  if (!name || !phone || !users) {
    return NextResponse.json(
      { error: "Name, phone number, and number of users are required." },
      { status: 400 },
    );
  }

  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASSWORD,
    SMTP_FROM_EMAIL,
    SMTP_FROM_NAME,
  } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD) {
    console.error("Missing SMTP configuration environment variables.");
    return NextResponse.json(
      { error: "Email is not configured on the server." },
      { status: 500 },
    );
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
  });

  const fromName = SMTP_FROM_NAME || "Meagle 360 Website";
  const fromEmail = SMTP_FROM_EMAIL || SMTP_USER;

  try {
    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: TO_EMAIL,
      replyTo: undefined,
      subject: `New demo request from ${name}`,
      text: [
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Number of users: ${users}`,
        `Message: ${message || "(none)"}`,
      ].join("\n"),
      html: `
        <h2>New demo request</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Number of users:</strong> ${escapeHtml(users)}</p>
        <p><strong>Message:</strong><br/>${escapeHtml(message || "(none)").replace(/\n/g, "<br/>")}</p>
      `,
    });
  } catch (err) {
    console.error("Failed to send contact email:", err);
    return NextResponse.json(
      { error: "Failed to send your message. Please try again later." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
