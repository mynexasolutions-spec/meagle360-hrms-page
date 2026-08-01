"use server";

import { createClient } from "../../utils/supabase/server";

export async function submitApplication(formData: FormData): Promise<{ error?: string; success?: boolean }> {
  const jobId = formData.get("job_id") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const expectedSalary = formData.get("expected_salary") as string;
  const cvFile = formData.get("cv") as File | null;

  if (!jobId || !name || !email || !expectedSalary || !cvFile) {
    return { error: "Missing required fields." };
  }

  if (cvFile.type !== "application/pdf") {
    return { error: "Only PDF files are allowed for CV." };
  }

  if (cvFile.size > 5 * 1024 * 1024) {
    return { error: "File is too large. Maximum size is 5MB." };
  }

  const supabase = await createClient();

  // 1. Upload CV to Supabase Storage
  const fileName = `${Date.now()}-${cvFile.name.replace(/[^a-zA-Z0-9.\-]/g, "")}`;
  const filePath = `cvs/${jobId}/${fileName}`;

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("cv_uploads")
    .upload(filePath, cvFile, {
      contentType: "application/pdf",
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    console.error("Upload error:", uploadError);
    return { error: "Failed to upload CV. Please ensure the 'cv_uploads' bucket is created and publicly writable." };
  }

  // 2. Get Public URL (assuming the bucket is public, or we just store the path and use signed URLs. We'll store the public URL for simplicity if it's a public bucket, or we can just store the full URL).
  const { data: urlData } = supabase.storage.from("cv_uploads").getPublicUrl(filePath);
  const cvUrl = urlData.publicUrl;

  // 3. Insert Application Record
  const { error: dbError } = await supabase
    .from("job_applications")
    .insert({
      job_id: jobId,
      name,
      email,
      phone: phone || null,
      expected_salary: expectedSalary,
      cv_url: cvUrl,
    });

  if (dbError) {
    console.error("Database error:", dbError);
    return { error: "Failed to submit application. Please try again." };
  }

  return { success: true };
}
