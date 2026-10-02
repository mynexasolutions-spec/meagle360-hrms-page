# SEO Automation Pipeline — Implementation Brief
For meagle360.com. Give this file directly to your coding agent as its task spec.

---

## Context

Five parts of the SEO workflow can be automated without any AI/LLM involvement, using
plain scripts on a schedule. This brief specifies all five as a single pipeline, running
weekly via GitHub Actions (free, works if the site's code lives in a GitHub repo).

Each task below is independent, implement and test them one at a time, then wire them
together in the final orchestration step.

---

## Prerequisites — one-time setup before any code runs

1. **Google Cloud project** — create one at console.cloud.google.com if one doesn't
   already exist for this site
2. **Enable two APIs** on that project: "Google Search Console API" and "Web Search
   Indexing API" (APIs & Services → Library → search each → Enable)
3. **Create a service account** (APIs & Services → Credentials → Create Credentials →
   Service Account), download its JSON key file
4. **Grant the service account access to Search Console**: in Search Console →
   Settings → Users and permissions → Add user → paste the service account's email
   (looks like `name@project-id.iam.gserviceaccount.com`) → grant "Owner" (needed for
   the Indexing API in Task 3; "Restricted" is enough for Task 1 alone)
5. **Store the JSON key as a GitHub Secret** (repo Settings → Secrets and variables →
   Actions → New repository secret), never commit it directly to the repo
6. Install dependencies in the project: `npm install googleapis cheerio node-fetch`

---

## Task 1 — Weekly GSC Data Pull

Create `scripts/pull-gsc-data.js`:

```javascript
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

async function pullGSCData() {
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GSC_SERVICE_ACCOUNT_KEY),
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });
  const searchconsole = google.searchconsole({ version: 'v1', auth });

  const siteUrl = 'https://www.meagle360.com/';
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 28);
  const fmt = (d) => d.toISOString().split('T')[0];

  const res = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate: fmt(startDate),
      endDate: fmt(endDate),
      dimensions: ['query', 'page'],
      rowLimit: 5000,
    },
  });

  const rows = res.data.rows || [];
  const pullDate = fmt(new Date());
  const logPath = path.join(__dirname, '../seo-data/gsc-log.csv');

  if (!fs.existsSync(path.dirname(logPath))) fs.mkdirSync(path.dirname(logPath), { recursive: true });
  if (!fs.existsSync(logPath)) {
    fs.writeFileSync(logPath, 'pull_date,query,page,clicks,impressions,ctr,position\n');
  }

  const lines = rows.map(r =>
    [pullDate, `"${r.keys[0]}"`, r.keys[1], r.clicks, r.impressions, (r.ctr * 100).toFixed(2), r.position.toFixed(1)].join(',')
  ).join('\n') + '\n';

  fs.appendFileSync(logPath, lines);
  console.log(`Pulled ${rows.length} rows for ${pullDate}`);
}

pullGSCData().catch(err => { console.error(err); process.exit(1); });
```

Set the `GSC_SERVICE_ACCOUNT_KEY` GitHub Secret to the full contents of the service
account's JSON key file.

Output: a running CSV log at `seo-data/gsc-log.csv`, one row per query/page/week, that
you or Claude can later analyze for the "high impressions, low clicks" pattern.

---

## Task 2 — Automatic Sitemap Generation

Create `scripts/generate-sitemap.js`. Adapt the `getAllRoutes()` function to however
this site's content is actually structured (CMS API call, reading markdown files from
a content directory, or querying the site's own route list, whichever applies):

```javascript
const fs = require('fs');
const path = require('path');

// ADAPT THIS: return every live route as { path: '/blog/...', lastmod: 'YYYY-MM-DD' }
async function getAllRoutes() {
  // Example if content is markdown files in /content/blog:
  const blogDir = path.join(__dirname, '../content/blog');
  const files = fs.existsSync(blogDir) ? fs.readdirSync(blogDir) : [];
  const blogRoutes = files.map(f => ({
    path: `/blog/${f.replace('.md', '')}`,
    lastmod: fs.statSync(path.join(blogDir, f)).mtime.toISOString().split('T')[0],
  }));

  const staticRoutes = [
    { path: '/', lastmod: new Date().toISOString().split('T')[0] },
    { path: '/pricing', lastmod: new Date().toISOString().split('T')[0] },
    { path: '/features', lastmod: new Date().toISOString().split('T')[0] },
  ];

  return [...staticRoutes, ...blogRoutes];
}

async function generateSitemap() {
  const baseUrl = 'https://www.meagle360.com';
  const routes = await getAllRoutes();

  const urlEntries = routes.map(r => `  <url>
    <loc>${baseUrl}${r.path}</loc>
    <lastmod>${r.lastmod}</lastmod>
  </url>`).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;

  const outPath = path.join(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(outPath, xml);
  console.log(`Sitemap written with ${routes.length} URLs`);
  return routes;
}

module.exports = { generateSitemap };
if (require.main === module) generateSitemap().catch(err => { console.error(err); process.exit(1); });
```

Run this on every deploy, not just weekly, ideally as a build step, so the sitemap
never lags behind what's actually published.

---

## Task 3 — Indexing Requests

**Important limitation to know before implementing this:** Google's Indexing API is
officially documented as intended only for pages with `JobPosting` or
`BroadcastEvent` structured data. Using it for ordinary blog/feature pages works for
many sites in practice and is widely used this way, but it isn't officially sanctioned
for this content type, and Google could stop accepting these submissions at any time.
It's worth using as a low-effort extra signal, not relying on as the primary indexing
strategy, the sitemap (Task 2) plus internal linking (Task 5) remain the real
foundation for discovery.

Create `scripts/request-indexing.js`:

```javascript
const { google } = require('googleapis');
const { generateSitemap } = require('./generate-sitemap');

async function requestIndexing(urls) {
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GSC_SERVICE_ACCOUNT_KEY),
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });
  const indexing = google.indexing({ version: 'v3', auth });

  for (const url of urls) {
    try {
      await indexing.urlNotifications.publish({ requestBody: { url, type: 'URL_UPDATED' } });
      console.log(`Submitted: ${url}`);
    } catch (err) {
      console.error(`Failed for ${url}: ${err.message}`);
    }
    await new Promise(r => setTimeout(r, 500)); // avoid hitting rate limits
  }
}

async function main() {
  const routes = await generateSitemap();
  const baseUrl = 'https://www.meagle360.com';
  // Only submit routes modified in the last 7 days, to avoid re-submitting the whole site weekly
  const recentRoutes = routes.filter(r => {
    const daysSince = (Date.now() - new Date(r.lastmod)) / (1000 * 60 * 60 * 24);
    return daysSince <= 7;
  });
  await requestIndexing(recentRoutes.map(r => baseUrl + r.path));
}

main().catch(err => { console.error(err); process.exit(1); });
```

---

## Task 4 — Weekly Technical Audit

Two parts: Lighthouse for performance/SEO scoring, and a custom crawler for the
specific issues already found in your manual OpenSEO audit (long titles, missing alt
text, long meta descriptions).

**Install:** `npm install -D @lhci/cli`

Create `lighthouserc.js` at the repo root:

```javascript
module.exports = {
  ci: {
    collect: {
      url: [
        'https://www.meagle360.com/',
        'https://www.meagle360.com/features/employee-database-software',
        'https://www.meagle360.com/features/payroll-software',
      ], // add more key URLs as the site grows
      numberOfRuns: 1,
    },
    assert: {
      assertions: {
        'categories:seo': ['warn', { minScore: 0.9 }],
        'categories:performance': ['warn', { minScore: 0.7 }],
      },
    },
    upload: { target: 'temporary-public-storage' },
  },
};
```

Create `scripts/technical-audit.js` for the specific checks already known to matter here:

```javascript
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const { generateSitemap } = require('./generate-sitemap');

async function auditPage(url) {
  const issues = [];
  try {
    const res = await fetch(url);
    if (!res.ok) { issues.push(`${url}: returned HTTP ${res.status}`); return issues; }
    const html = await res.text();
    const $ = cheerio.load(html);

    const title = $('title').text();
    if (title.length > 60) issues.push(`${url}: title too long (${title.length} chars)`);

    const metaDesc = $('meta[name="description"]').attr('content') || '';
    if (metaDesc.length > 160) issues.push(`${url}: meta description too long (${metaDesc.length} chars)`);
    if (!metaDesc) issues.push(`${url}: missing meta description`);

    $('img').each((i, el) => {
      if (!$(el).attr('alt')) {
        issues.push(`${url}: image missing alt text (${$(el).attr('src') || 'unknown src'})`);
      }
    });

    const h1Count = $('h1').length;
    if (h1Count === 0) issues.push(`${url}: no H1 found`);
    if (h1Count > 1) issues.push(`${url}: multiple H1s found (${h1Count})`);
  } catch (err) {
    issues.push(`${url}: fetch failed — ${err.message}`);
  }
  return issues;
}

async function runAudit() {
  const routes = await generateSitemap();
  const baseUrl = 'https://www.meagle360.com';
  let allIssues = [];

  for (const route of routes) {
    const issues = await auditPage(baseUrl + route.path);
    allIssues = allIssues.concat(issues);
  }

  const reportPath = path.join(__dirname, '../seo-data/technical-audit-latest.md');
  const report = `# Technical Audit — ${new Date().toISOString().split('T')[0]}\n\n` +
    (allIssues.length ? allIssues.map(i => `- ${i}`).join('\n') : 'No issues found.');
  fs.writeFileSync(reportPath, report);
  console.log(`Audit complete: ${allIssues.length} issues found`);
}

runAudit().catch(err => { console.error(err); process.exit(1); });
```

---

## Task 5 — Internal Link Suggestions

This flags opportunities, it does not auto-edit content, linking decisions stay a
human/AI-reviewed step, only the detection is automated.

Create `scripts/suggest-internal-links.js`. Adapt `loadPosts()` to read from wherever
blog content actually lives:

```javascript
const fs = require('fs');
const path = require('path');

// ADAPT THIS: return [{ slug, title, content, keywords: [...] }] for every blog post
function loadPosts() {
  const blogDir = path.join(__dirname, '../content/blog');
  if (!fs.existsSync(blogDir)) return [];

  return fs.readdirSync(blogDir).map(file => {
    const content = fs.readFileSync(path.join(blogDir, file), 'utf-8');
    const slug = file.replace('.md', '');
    const titleMatch = content.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : slug;
    // Simple keyword extraction: significant words from the title, lowercased
    const keywords = title.toLowerCase().split(/\W+/).filter(w => w.length > 3);
    return { slug, title, content, keywords };
  });
}

function suggestLinks(posts) {
  const suggestions = [];
  for (const a of posts) {
    for (const b of posts) {
      if (a.slug === b.slug) continue;
      const shared = a.keywords.filter(k => b.keywords.includes(k));
      const alreadyLinked = a.content.includes(`/blog/${b.slug}`);
      if (shared.length >= 2 && !alreadyLinked) {
        suggestions.push({ from: a.slug, to: b.slug, sharedKeywords: [...new Set(shared)] });
      }
    }
  }
  return suggestions;
}

function main() {
  const posts = loadPosts();
  const suggestions = suggestLinks(posts);
  const reportPath = path.join(__dirname, '../seo-data/internal-link-suggestions.md');

  const report = `# Internal Link Suggestions — ${new Date().toISOString().split('T')[0]}\n\n` +
    (suggestions.length
      ? suggestions.map(s => `- Link **${s.from}** → **${s.to}** (shared: ${s.sharedKeywords.join(', ')})`).join('\n')
      : 'No new suggestions found.');

  fs.writeFileSync(reportPath, report);
  console.log(`Found ${suggestions.length} link suggestions`);
}

main();
```

The keyword-matching logic here is intentionally simple (shared significant words in
titles). It will produce some false positives, review the generated report before
acting on it rather than auto-inserting links.

---

## Orchestration — GitHub Actions Workflow

Create `.github/workflows/seo-automation.yml`:

```yaml
name: Weekly SEO Automation

on:
  schedule:
    - cron: '0 6 * * 1' # every Monday, 6 AM UTC
  workflow_dispatch: {} # allows manual trigger from the Actions tab

jobs:
  seo-automation:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - run: npm install

      - name: Pull GSC data
        run: node scripts/pull-gsc-data.js
        env:
          GSC_SERVICE_ACCOUNT_KEY: ${{ secrets.GSC_SERVICE_ACCOUNT_KEY }}

      - name: Generate sitemap
        run: node scripts/generate-sitemap.js

      - name: Request indexing for recently updated pages
        run: node scripts/request-indexing.js
        env:
          GSC_SERVICE_ACCOUNT_KEY: ${{ secrets.GSC_SERVICE_ACCOUNT_KEY }}

      - name: Run technical audit
        run: node scripts/technical-audit.js

      - name: Suggest internal links
        run: node scripts/suggest-internal-links.js

      - name: Commit updated data files
        run: |
          git config user.name "seo-automation-bot"
          git config user.email "actions@github.com"
          git add seo-data/ public/sitemap.xml
          git diff --staged --quiet || git commit -m "Weekly SEO automation update"
          git push
```

---

## Verification checklist

- [ ] Service account created, JSON key stored as `GSC_SERVICE_ACCOUNT_KEY` GitHub Secret
- [ ] Service account added as a user in Search Console with appropriate permission level
- [ ] `getAllRoutes()` in Task 2 adapted to this site's actual content source
- [ ] `loadPosts()` in Task 5 adapted to this site's actual content source
- [ ] Workflow runs successfully via manual trigger (`workflow_dispatch`) before relying on the schedule
- [ ] `seo-data/gsc-log.csv` populates with real rows after first run
- [ ] `public/sitemap.xml` reflects all live routes after first run
- [ ] `seo-data/technical-audit-latest.md` and `seo-data/internal-link-suggestions.md` are reviewed weekly, not left unread
- [ ] Indexing request step treated as a minor extra signal, not the primary indexing strategy (see Task 3 caveat)