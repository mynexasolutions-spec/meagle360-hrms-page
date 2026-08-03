import { createClient } from "../utils/supabase/server";

export type Job = {
  id: string;
  title: string;
  slug: string;
  location: string | null;
  job_type: string | null;
  description: string;
  published: boolean;
  created_at: string;
};

export async function getAllJobsForAdmin() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("jobs")
    .select("id, title, slug, location, job_type, published, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
  return data;
}

export async function getJobByIdForAdmin(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching job:", error);
    return null;
  }
  return data;
}

export async function getAllJobs() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("jobs")
    .select("id, title, slug, location, job_type, created_at, updated_at")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching published jobs:", error);
    return [];
  }
  return data;
}

export async function getJobBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error) {
    console.error("Error fetching job by slug:", error);
    return null;
  }
  return data;
}

export async function getApplicationsForAdmin(jobId?: string) {
  const supabase = await createClient();
  let query = supabase
    .from("job_applications")
    .select("id, name, email, phone, expected_salary, cv_url, created_at, jobs(title, slug)")
    .order("created_at", { ascending: false });
  
  if (jobId) {
    query = query.eq("job_id", jobId);
  }

  const { data, error } = await query;
  if (error) {
    console.error("Error fetching applications:", error);
    return [];
  }
  return data;
}
