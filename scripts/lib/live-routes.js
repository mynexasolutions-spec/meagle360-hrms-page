// Shared helper for the SEO automation scripts.
//
// This site already serves a dynamic sitemap (app/sitemap.ts) generated at
// request time from Supabase posts + lib/features-data.ts. The original brief's
// Task 2 assumed a static-file sitemap generator script — that would just be a
// second, competing source of truth that can drift out of sync with the real
// one. Instead, every script here reads routes straight from the live
// sitemap.xml, which is always accurate.

const BASE_URL = "https://www.meagle360.com";

async function getLiveRoutes() {
  const res = await fetch(`${BASE_URL}/sitemap.xml`);
  if (!res.ok) throw new Error(`Failed to fetch sitemap.xml: HTTP ${res.status}`);
  const xml = await res.text();

  const routes = [];
  const urlBlocks = xml.match(/<url>[\s\S]*?<\/url>/g) || [];
  for (const block of urlBlocks) {
    const locMatch = block.match(/<loc>(.*?)<\/loc>/);
    const lastmodMatch = block.match(/<lastmod>(.*?)<\/lastmod>/);
    if (!locMatch) continue;
    const url = locMatch[1];
    routes.push({
      url,
      path: url.replace(BASE_URL, ""),
      lastmod: lastmodMatch ? lastmodMatch[1].split("T")[0] : null,
    });
  }
  return routes;
}

module.exports = { getLiveRoutes, BASE_URL };
