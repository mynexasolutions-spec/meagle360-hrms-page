"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../../../utils/supabase/server";

export type JobInput = {
  title: string;
  slug: string;
  location: string;
  job_type: string;
  description: string;
  published: boolean;
};

function friendlyError(message: string) {
  if (message.includes("jobs_slug_key")) {
    return "That URL slug is already used by another job. Choose a different one.";
  }
  return message;
}

const NBSP_PATTERN = new RegExp("&nbsp;|&#160;|&#xa0;|\\u00a0|\\ufeff", "gi");

function normalizeContent(html: string): string {
  return html.replace(NBSP_PATTERN, " ");
}

export async function createJob(input: JobInput): Promise<{ error?: string; id?: string }> {
  const supabase = await createClient();

  if (!input.title.trim() || !input.slug.trim()) {
    return { error: "Title and slug are required." };
  }

  const { data, error } = await supabase
    .from("jobs")
    .insert({
      title: input.title.trim(),
      slug: input.slug.trim(),
      location: input.location.trim() || null,
      job_type: input.job_type.trim() || null,
      description: normalizeContent(input.description),
      published: input.published,
    })
    .select("id")
    .single();

  if (error) return { error: friendlyError(error.message) };

  revalidatePath("/admin/jobs");
  revalidatePath("/careers");
  return { id: data.id };
}

export async function updateJob(
  id: string,
  input: JobInput,
): Promise<{ error?: string }> {
  const supabase = await createClient();

  if (!input.title.trim() || !input.slug.trim()) {
    return { error: "Title and slug are required." };
  }

  const { error } = await supabase
    .from("jobs")
    .update({
      title: input.title.trim(),
      slug: input.slug.trim(),
      location: input.location.trim() || null,
      job_type: input.job_type.trim() || null,
      description: normalizeContent(input.description),
      published: input.published,
    })
    .eq("id", id);

  if (error) return { error: friendlyError(error.message) };

  revalidatePath("/admin/jobs");
  revalidatePath("/careers");
  revalidatePath(`/careers/${input.slug.trim()}`);
  return {};
}

export async function deleteJob(id: string, slug: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("jobs").delete().eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/jobs");
  revalidatePath("/careers");
  revalidatePath(`/careers/${slug}`);
  return {};
}
