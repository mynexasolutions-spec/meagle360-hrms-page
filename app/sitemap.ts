import type { MetadataRoute } from "next";
import { getPublishedPosts } from "../lib/posts";
import { getAllJobs } from "../lib/jobs";
import { FEATURE_PAGES } from "../lib/features-data";
import { getPublishedHrTemplates } from "../lib/hr-templates";

const BASE = "https://www.meagle360.com";

// Date of the on-page keyword retargeting of the homepage and these four
// feature pages — tells crawlers the content changed.
const KEYWORD_UPDATE = new Date("2026-10-21");
const KEYWORD_UPDATED_FEATURES = new Set([
  "employee-database-software",
  "payroll-software",
  "hiring-management-software",
  "hr-reports-analytics",
]);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const statics: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: KEYWORD_UPDATE, priority: 1.0, changeFrequency: "weekly" },
    { url: `${BASE}/pricing`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE}/demo`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE}/contact`, priority: 0.6, changeFrequency: "yearly" },
    { url: `${BASE}/blog`, priority: 0.8, changeFrequency: "daily" },
    { url: `${BASE}/careers`, priority: 0.5, changeFrequency: "weekly" },
    { url: `${BASE}/about`, priority: 0.5, changeFrequency: "monthly" },
    { url: `${BASE}/security`, priority: 0.4, changeFrequency: "monthly" },
    { url: `${BASE}/privacy`, priority: 0.3, changeFrequency: "yearly" },
    { url: `${BASE}/terms`, priority: 0.3, changeFrequency: "yearly" },
    { url: `${BASE}/alternatives/keka-alternative`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE}/alternatives/greythr-alternative`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE}/solutions/hrms-for-startups`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE}/tools/payslip-generator`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE}/tools/ctc-to-in-hand-calculator`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE}/tools/quotation-maker`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE}/templates`, priority: 0.8, changeFrequency: "weekly" },
  ];

  const posts = await getPublishedPosts();
  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: post.updated_at ? new Date(post.updated_at) : undefined,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const jobs = await getAllJobs();
  const jobRoutes: MetadataRoute.Sitemap = jobs.map((job) => ({
    url: `${BASE}/careers/${job.slug}`,
    lastModified: job.updated_at ? new Date(job.updated_at) : undefined,
    priority: 0.4,
  }));

  const featureRoutes: MetadataRoute.Sitemap = FEATURE_PAGES.map((f) => ({
    url: `${BASE}/features/${f.slug}`,
    lastModified: KEYWORD_UPDATED_FEATURES.has(f.slug) ? KEYWORD_UPDATE : undefined,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const hrTemplates = await getPublishedHrTemplates();
  const hrTemplateRoutes: MetadataRoute.Sitemap = hrTemplates.map((t) => ({
    url: `${BASE}/templates/${t.slug}`,
    lastModified: t.updated_at ? new Date(t.updated_at) : undefined,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...statics, ...postRoutes, ...jobRoutes, ...featureRoutes, ...hrTemplateRoutes];
}
