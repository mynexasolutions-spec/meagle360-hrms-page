// Task 4 — Weekly technical audit (custom crawler half; Lighthouse runs as a
// separate CI step via lighthouserc.js).
//
// Checks the specific issues this site has actually hit before:
// - title/meta length
// - missing meta description
// - missing image alt text
// - missing/duplicate H1
// - the recurring "double | Meagle 360" title-suffix bug (any seo_title/page
//   TITLE that already contains the site suffix gets it appended again by the
//   root layout's title template)
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const { getLiveRoutes } = require("./lib/live-routes");

async function auditPage(url) {
  const issues = [];
  try {
    const res = await fetch(url);
    if (!res.ok) {
      issues.push(`${url}: returned HTTP ${res.status}`);
      return issues;
    }
    const html = await res.text();
    const $ = cheerio.load(html);

    const title = $("title").text();
    if (title.length > 60) issues.push(`${url}: title too long (${title.length} chars): "${title}"`);
    if ((title.match(/Meagle 360/g) || []).length > 1) {
      issues.push(`${url}: title contains "Meagle 360" more than once — likely the double-suffix bug: "${title}"`);
    }

    const metaDesc = $('meta[name="description"]').attr("content") || "";
    if (metaDesc.length > 160) issues.push(`${url}: meta description too long (${metaDesc.length} chars)`);
    if (!metaDesc) issues.push(`${url}: missing meta description`);

    $("img").each((i, el) => {
      if (!$(el).attr("alt")) {
        issues.push(`${url}: image missing alt text (${$(el).attr("src") || "unknown src"})`);
      }
    });

    const h1Count = $("h1").length;
    if (h1Count === 0) issues.push(`${url}: no H1 found`);
    if (h1Count > 1) issues.push(`${url}: multiple H1s found (${h1Count})`);
  } catch (err) {
    issues.push(`${url}: fetch failed — ${err.message}`);
  }
  return issues;
}

async function runAudit() {
  const routes = await getLiveRoutes();
  let allIssues = [];

  for (const route of routes) {
    const issues = await auditPage(route.url);
    allIssues = allIssues.concat(issues);
  }

  const reportPath = path.join(__dirname, "../seo-data/technical-audit-latest.md");
  if (!fs.existsSync(path.dirname(reportPath))) fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  const report =
    `# Technical Audit — ${new Date().toISOString().split("T")[0]}\n\n` +
    `Crawled ${routes.length} URLs from the live sitemap.\n\n` +
    (allIssues.length ? allIssues.map((i) => `- ${i}`).join("\n") : "No issues found.");
  fs.writeFileSync(reportPath, report);
  console.log(`Audit complete: ${allIssues.length} issue(s) found across ${routes.length} URLs`);
}

runAudit().catch((err) => {
  console.error(err);
  process.exit(1);
});
