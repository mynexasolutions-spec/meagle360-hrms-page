import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { BlogIndexView } from "../../../components/BlogIndexView";
import { getPublishedPostsPage, POSTS_PER_PAGE } from "../../../../lib/posts";

export const revalidate = 60;

function parsePage(raw: string): number | null {
  return /^\d+$/.test(raw) ? Number(raw) : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page: raw } = await params;
  const page = parsePage(raw);
  if (!page || page < 2) return {};
  const title = `HR Blog: HRMS Tips, Payroll & HR Best Practices (Page ${page})`;
  const description =
    "Insights on HRMS software, payroll compliance, attendance management, and HR best practices from the Meagle 360 team.";
  return {
    title,
    description,
    alternates: { canonical: `/blog/page/${page}` },
    openGraph: { title, description, url: `/blog/page/${page}`, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function BlogPaginatedPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page: raw } = await params;
  const page = parsePage(raw);
  if (!page || page < 1) notFound();
  if (page === 1) permanentRedirect("/blog");

  const { total } = await getPublishedPostsPage(page);
  if (page > Math.max(1, Math.ceil(total / POSTS_PER_PAGE))) notFound();

  return <BlogIndexView page={page} />;
}
