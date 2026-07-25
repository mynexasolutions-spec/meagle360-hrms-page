"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "../../utils/supabase/server";

export type PostInput = {
  title: string;
  slug: string;
  category: string;
  content: string;
  cover_image_url: string;
  cover_image_alt: string;
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  canonical_url: string;
  published: boolean;
};

function friendlyError(message: string) {
  if (message.includes("posts_slug_key")) {
    return "That URL slug is already used by another post. Choose a different one.";
  }
  return message;
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function createPost(input: PostInput): Promise<{ error?: string; id?: string }> {
  const supabase = await createClient();

  if (!input.title.trim() || !input.slug.trim()) {
    return { error: "Title and slug are required." };
  }

  const { data, error } = await supabase
    .from("posts")
    .insert({
      title: input.title.trim(),
      slug: input.slug.trim(),
      category: input.category.trim() || null,
      content: input.content,
      cover_image_url: input.cover_image_url.trim() || null,
      cover_image_alt: input.cover_image_alt.trim() || null,
      seo_title: input.seo_title.trim() || null,
      seo_description: input.seo_description.trim() || null,
      seo_keywords: input.seo_keywords.trim() || null,
      canonical_url: input.canonical_url.trim() || null,
      published: input.published,
      published_at: input.published ? new Date().toISOString() : null,
    })
    .select("id")
    .single();

  if (error) return { error: friendlyError(error.message) };

  revalidatePath("/admin");
  revalidatePath("/blog");
  return { id: data.id };
}

export async function updatePost(
  id: string,
  input: PostInput,
): Promise<{ error?: string }> {
  const supabase = await createClient();

  if (!input.title.trim() || !input.slug.trim()) {
    return { error: "Title and slug are required." };
  }

  const { data: existing } = await supabase
    .from("posts")
    .select("published, published_at")
    .eq("id", id)
    .maybeSingle();

  const publishedAt =
    input.published && !existing?.published
      ? new Date().toISOString()
      : (existing?.published_at ?? null);

  const { error } = await supabase
    .from("posts")
    .update({
      title: input.title.trim(),
      slug: input.slug.trim(),
      category: input.category.trim() || null,
      content: input.content,
      cover_image_url: input.cover_image_url.trim() || null,
      cover_image_alt: input.cover_image_alt.trim() || null,
      seo_title: input.seo_title.trim() || null,
      seo_description: input.seo_description.trim() || null,
      seo_keywords: input.seo_keywords.trim() || null,
      canonical_url: input.canonical_url.trim() || null,
      published: input.published,
      published_at: input.published ? publishedAt : null,
    })
    .eq("id", id);

  if (error) return { error: friendlyError(error.message) };

  revalidatePath("/admin");
  revalidatePath("/blog");
  revalidatePath(`/blog/${input.slug.trim()}`);
  return {};
}

export async function deletePost(id: string, slug: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  return {};
}
