import { NextResponse } from "next/server";
import { waitUntil } from "@vercel/functions";
import { createClient } from "../../../utils/supabase/server";
import { escapeHtml, isEmailConfigured, sendLeadEmail } from "../../../lib/lead-email";

export async function POST(request: Request) {
  let body: {
    name?: string;
    email?: string;
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
  const email = (body.email || "").trim();
  const phone = (body.phone || "").trim();
  const users = (body.users || "").trim();
  const message = (body.message || "").trim();

  if (!name || !email || !phone || !users) {
    return NextResponse.json(
      { error: "Name, email, phone number, and number of users are required." },
      { status: 400 },
    );
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  // Start the email straight away so it runs alongside the database save
  // instead of after it.
  const emailPromise = isEmailConfigured()
    ? sendLeadEmail({
        replyTo: email,
        subject: `New demo request from ${name}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Phone: ${phone}`,
          `Number of users: ${users}`,
          `Message: ${message || "(none)"}`,
        ].join("\n"),
        html: `
          <h2>New demo request</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
          <p><strong>Number of users:</strong> ${escapeHtml(users)}</p>
          <p><strong>Message:</strong><br/>${escapeHtml(message || "(none)").replace(/\n/g, "<br/>")}</p>
        `,
      })
    : Promise.reject(new Error("Missing SMTP configuration environment variables."));
  emailPromise.catch((err) => console.error("Failed to send contact email:", err));

  let saved = false;
  try {
    const supabase = await createClient();
    const { error: dbError } = await supabase
      .from("contact_submissions")
      .insert({ name, email, phone, users, message: message || null });
    if (dbError) console.error("Failed to save contact submission:", dbError);
    else saved = true;
  } catch (err) {
    console.error("Failed to save contact submission:", err);
  }

  if (saved) {
    // The lead is safely stored (and visible in /admin/leads), so answer now
    // and let the email finish in the background.
    waitUntil(emailPromise.catch(() => {}));
    return NextResponse.json({ ok: true });
  }

  // Couldn't store it, so the email is the only record: wait for it.
  try {
    await emailPromise;
  } catch {
    return NextResponse.json(
      { error: "Failed to send your message. Please try again later." },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
