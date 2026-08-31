import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "info@meagle360.com";

export async function POST(request: Request) {
  let body: {
    name?: string;
    work_email?: string;
    employees?: string;
    phone?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const workEmail = (body.work_email || "").trim();
  const employees = (body.employees || "").trim();
  const phone = (body.phone || "").trim();

  if (!name || !workEmail || !employees || !phone) {
    return NextResponse.json(
      { error: "All fields are required." },
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
      replyTo: workEmail,
      subject: `New demo booking from ${name}`,
      text: [
        `Name: ${name}`,
        `Work email: ${workEmail}`,
        `Employees: ${employees}`,
        `Phone: ${phone}`,
      ].join("\n"),
      html: `
        <h2>New demo booking</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Work email:</strong> ${escapeHtml(workEmail)}</p>
        <p><strong>Employees:</strong> ${escapeHtml(employees)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      `,
    });
  } catch (err) {
    console.error("Failed to send demo request email:", err);
    return NextResponse.json(
      { error: "Failed to send your request. Please try again later." },
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
