// Task 1 — Weekly GSC data pull.
// Requires: GSC_SERVICE_ACCOUNT_KEY env var (service account JSON, full contents,
// added to Search Console with at least "Restricted" access on this property).
const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

async function pullGSCData() {
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GSC_SERVICE_ACCOUNT_KEY),
    scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
  });
  const searchconsole = google.searchconsole({ version: "v1", auth });

  const siteUrl = "https://www.meagle360.com/";
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 28);
  const fmt = (d) => d.toISOString().split("T")[0];

  const res = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate: fmt(startDate),
      endDate: fmt(endDate),
      dimensions: ["query", "page"],
      rowLimit: 5000,
    },
  });

  const rows = res.data.rows || [];
  const pullDate = fmt(new Date());
  const logPath = path.join(__dirname, "../seo-data/gsc-log.csv");

  if (!fs.existsSync(path.dirname(logPath))) fs.mkdirSync(path.dirname(logPath), { recursive: true });
  if (!fs.existsSync(logPath)) {
    fs.writeFileSync(logPath, "pull_date,query,page,clicks,impressions,ctr,position\n");
  }

  const lines =
    rows
      .map((r) =>
        [pullDate, `"${r.keys[0]}"`, r.keys[1], r.clicks, r.impressions, (r.ctr * 100).toFixed(2), r.position.toFixed(1)].join(",")
      )
      .join("\n") + "\n";

  fs.appendFileSync(logPath, lines);
  console.log(`Pulled ${rows.length} rows for ${pullDate}`);
}

pullGSCData().catch((err) => {
  console.error(err);
  process.exit(1);
});
