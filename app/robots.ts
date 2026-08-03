import type { MetadataRoute } from "next";

const SITE_URL = "https://www.meagle360.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /admin isn't in the audit's snippet (it doesn't know this project
        // has an admin panel) — kept disallowed so the login/CMS never gets
        // crawled or indexed.
        disallow: ["/admin", "/api/", "/*?*utm_", "/thank-you"],
      },
      {
        userAgent: "GPTBot",
        allow: "/",
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
