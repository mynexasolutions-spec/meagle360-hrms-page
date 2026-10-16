import { NextResponse } from "next/server";
import { waitUntil } from "@vercel/functions";
import { createClient } from "../../../utils/supabase/server";
import { escapeHtml, isEmailConfigured, sendLeadEmail } from "../../../lib/lead-email";
import type { ChatTranscriptMessage } from "../../../lib/chatbot-leads";

export async function POST(request: Request) {
  let body: { name?: string; phone?: string; transcript?: ChatTranscriptMessage[]; source?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const phone = (body.phone || "").trim();
  const source = (body.source || "").trim();
  const transcript = Array.isArray(body.transcript) ? body.transcript.slice(0, 50) : [];

  if (!name || !phone) {
    return NextResponse.json({ error: "Name and phone number are required." }, { status: 400 });
  }

  let saved = false;
  try {
    const supabase = await createClient();
    const { error: dbError } = await supabase.from("chatbot_leads").insert({
      name,
      phone,
      transcript,
      source: source || null,
    });
    if (dbError) console.error("Failed to save chatbot lead:", dbError);
    else saved = true;
  } catch (err) {
    console.error("Failed to save chatbot lead:", err);
  }

  if (!saved) {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 502 });
  }

  if (isEmailConfigured()) {
    const transcriptText = transcript.map((m) => `${m.role === "user" ? "Visitor" : "Bot"}: ${m.text}`).join("\n");
    const transcriptHtml = transcript
      .map((m) => `<p><strong>${m.role === "user" ? "Visitor" : "Bot"}:</strong> ${escapeHtml(m.text)}</p>`)
      .join("");
    const internalEmail = sendLeadEmail({
      subject: `New chatbot lead: ${name}`,
      text: [`Name: ${name}`, `Phone: ${phone}`, `Source: ${source || "-"}`, "", "Transcript:", transcriptText].join("\n"),
      html: `
        <h2>New chatbot lead</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Source:</strong> ${escapeHtml(source || "-")}</p>
        <h3>Transcript</h3>
        ${transcriptHtml}
      `,
    });
    internalEmail.catch((err) => console.error("Failed to send internal chatbot lead email:", err));
    waitUntil(internalEmail.catch(() => {}));
  }

  return NextResponse.json({ ok: true });
}
