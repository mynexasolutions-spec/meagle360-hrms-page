import { NextResponse } from "next/server";
import { waitUntil } from "@vercel/functions";
import { createClient } from "../../../utils/supabase/server";
import { escapeHtml, isEmailConfigured, sendLeadEmail } from "../../../lib/lead-email";

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

  const emailPromise = isEmailConfigured()
    ? sendLeadEmail({
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
      })
    : Promise.reject(new Error("Missing SMTP configuration environment variables."));
  emailPromise.catch((err) => console.error("Failed to send demo request email:", err));

  // Demo bookings are stored alongside contact requests so they appear in
  // /admin/leads even if the email is delayed or fails.
  let saved = false;
  try {
    const supabase = await createClient();
    const { error: dbError } = await supabase.from("contact_submissions").insert({
      name,
      phone,
      users: employees,
      message: `Demo booking. Work email: ${workEmail}`,
    });
    if (dbError) console.error("Failed to save demo booking:", dbError);
    else saved = true;
  } catch (err) {
    console.error("Failed to save demo booking:", err);
  }

  if (saved) {
    waitUntil(emailPromise.catch(() => {}));
    return NextResponse.json({ ok: true });
  }

  try {
    await emailPromise;
  } catch {
    return NextResponse.json(
      { error: "Failed to send your request. Please try again later." },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
