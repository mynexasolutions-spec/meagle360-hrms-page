import { createClient } from "../utils/supabase/server";

export type ChatTranscriptMessage = { role: "user" | "bot"; text: string };

export type ChatbotLead = {
  id: string;
  phone: string;
  transcript: ChatTranscriptMessage[];
  source: string | null;
  created_at: string;
};

export async function getChatbotLeadsForAdmin(): Promise<ChatbotLead[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("chatbot_leads")
    .select("id, phone, transcript, source, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching chatbot leads:", error);
    return [];
  }
  return data;
}
