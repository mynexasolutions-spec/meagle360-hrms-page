// Task 3 — Indexing requests.
//
// Caveat (from the brief, worth keeping visible here): Google's Indexing API is
// officially documented for JobPosting/BroadcastEvent pages only. Using it for
// ordinary blog/feature pages works in practice for many sites but isn't
// officially sanctioned for this content type. Treat this as a minor extra
// signal — the sitemap plus internal linking remain the real discovery path.
//
// Requires: GSC_SERVICE_ACCOUNT_KEY env var, with the service account granted
// "Owner" on this property in Search Console (Indexing API needs Owner, not
// just Restricted).
const { google } = require("googleapis");
const { getLiveRoutes } = require("./lib/live-routes");

async function requestIndexing(urls) {
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GSC_SERVICE_ACCOUNT_KEY),
    scopes: ["https://www.googleapis.com/auth/indexing"],
  });
  const indexing = google.indexing({ version: "v3", auth });

  for (const url of urls) {
    try {
      await indexing.urlNotifications.publish({ requestBody: { url, type: "URL_UPDATED" } });
      console.log(`Submitted: ${url}`);
    } catch (err) {
      console.error(`Failed for ${url}: ${err.message}`);
    }
    await new Promise((r) => setTimeout(r, 500)); // avoid hitting rate limits
  }
}

async function main() {
  const routes = await getLiveRoutes();
  // Only submit routes with a lastmod within the last 7 days, to avoid
  // re-submitting the whole site weekly. Static routes have no lastmod in
  // app/sitemap.ts and are never auto-resubmitted here.
  const recentRoutes = routes.filter((r) => {
    if (!r.lastmod) return false;
    const daysSince = (Date.now() - new Date(r.lastmod).getTime()) / (1000 * 60 * 60 * 24);
    return daysSince <= 7;
  });
  console.log(`${recentRoutes.length} of ${routes.length} route(s) modified in the last 7 days`);
  await requestIndexing(recentRoutes.map((r) => r.url));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
