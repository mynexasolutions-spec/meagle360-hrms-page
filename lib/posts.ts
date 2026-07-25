import { createClient } from "../utils/supabase/server";
import type { Post } from "./blog-types";

export type { Post };

export async function getPublishedPosts(): Promise<Post[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Failed to load published posts:", error);
    return [];
  }
  return data ?? [];
}

export async function getRelatedPosts(category: string | null, excludeId: string): Promise<Post[]> {
  if (!category) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .eq("category", category)
    .neq("id", excludeId)
    .order("published_at", { ascending: false })
    .limit(3);

  if (error) {
    console.error("Failed to load related posts:", error);
    return [];
  }
  return data ?? [];
}

export async function getPublishedPostBySlug(slug: string): Promise<Post | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) {
    console.error("Failed to load post:", error);
    return null;
  }
  return data;
}

export async function getAllPostsForAdmin(): Promise<Post[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to load posts:", error);
    return [];
  }
  return data ?? [];
}

export async function getPostByIdForAdmin(id: string): Promise<Post | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("posts").select("*").eq("id", id).maybeSingle();

  if (error) {
    console.error("Failed to load post:", error);
    return null;
  }
  return data;
}
