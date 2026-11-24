import { createClient } from "../utils/supabase/server";
import type { Post } from "./blog-types";

export type { Post };

export const POSTS_PER_PAGE = 12;

// One page of published posts (newest first) plus the total count, for /blog pagination.
export async function getPublishedPostsPage(
  page: number,
): Promise<{ posts: Post[]; total: number }> {
  const supabase = await createClient();
  const from = (page - 1) * POSTS_PER_PAGE;
  const { data, error, count } = await supabase
    .from("posts")
    .select("*", { count: "exact" })
    .eq("published", true)
    .order("published_at", { ascending: false })
    .range(from, from + POSTS_PER_PAGE - 1);

  if (error) {
    console.error("Failed to load published posts page:", error);
    return { posts: [], total: 0 };
  }
  return { posts: data ?? [], total: count ?? 0 };
}

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
