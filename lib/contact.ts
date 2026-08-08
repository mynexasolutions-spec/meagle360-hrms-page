import { createClient } from "../utils/supabase/server";

export type ContactSubmission = {
  id: string;
  name: string;
  phone: string;
  users: string | null;
  message: string | null;
  created_at: string;
};

export async function getContactSubmissionsForAdmin(): Promise<ContactSubmission[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contact_submissions")
    .select("id, name, phone, users, message, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching contact submissions:", error);
    return [];
  }
  return data;
}
