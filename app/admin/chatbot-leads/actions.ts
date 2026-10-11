"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../../../utils/supabase/server";

export async function deleteChatbotLead(id: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("chatbot_leads").delete().eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/chatbot-leads");
  return {};
}
