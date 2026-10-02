// Task 5 — Internal link suggestions.
//
// Flags opportunities only, never auto-edits content — linking decisions stay
// a human/AI-reviewed step, same as every internal link added manually this
// project so far. The keyword matching is intentionally simple (shared
// significant words between titles) and will produce false positives; review
// the generated report before acting on it.
//
// Adapted from the brief: this site's blog posts live in Supabase (posts
// table), not markdown files, so this reads from there via SUPABASE_DB_URL —
// the same connection string used by every other admin script this session.
const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

const STOPWORDS = new Set([
  "this", "that", "with", "from", "your", "have", "what", "when", "where",
  "which", "their", "about", "into", "will", "they", "them", "does", "much",
  // Terms that show up in most post titles on this site regardless of topic —
  // without excluding these, nearly every post "matches" every other post.
  // Tuned against the real 32-post corpus on 2026-09-27; revisit if it gets noisy again.
  "india", "2026", "guide", "complete", "best", "meaning", "explained",
  "rules", "types", "examples", "difference", "actually", "everything",
]);

function extractKeywords(title) {
  return title
    .toLowerCase()
    .split(/\W+/)
    .filter((w) => w.length > 3 && !STOPWORDS.has(w));
}

async function loadPosts() {
  const client = new Client({ connectionString: process.env.SUPABASE_DB_URL });
  await client.connect();
  const { rows } = await client.query(`select slug, title, content from posts where published = true`);
  await client.end();
  return rows.map((r) => ({
    slug: r.slug,
    title: r.title,
    content: r.content || "",
    keywords: extractKeywords(r.title),
  }));
}

function suggestLinks(posts) {
  const suggestions = [];
  for (const a of posts) {
    for (const b of posts) {
      if (a.slug === b.slug) continue;
      const shared = a.keywords.filter((k) => b.keywords.includes(k));
      const alreadyLinked = a.content.includes(`/blog/${b.slug}`);
      if (shared.length >= 2 && !alreadyLinked) {
        suggestions.push({ from: a.slug, to: b.slug, sharedKeywords: [...new Set(shared)] });
      }
    }
  }
  return suggestions;
}

async function main() {
  const posts = await loadPosts();
  const suggestions = suggestLinks(posts);
  const reportPath = path.join(__dirname, "../seo-data/internal-link-suggestions.md");
  if (!fs.existsSync(path.dirname(reportPath))) fs.mkdirSync(path.dirname(reportPath), { recursive: true });

  const report =
    `# Internal Link Suggestions — ${new Date().toISOString().split("T")[0]}\n\n` +
    `Checked ${posts.length} published posts. Keyword-overlap suggestions only — review before adding any link, do not auto-insert.\n\n` +
    (suggestions.length
      ? suggestions.map((s) => `- Link **${s.from}** → **${s.to}** (shared: ${s.sharedKeywords.join(", ")})`).join("\n")
      : "No new suggestions found.");

  fs.writeFileSync(reportPath, report);
  console.log(`Found ${suggestions.length} link suggestion(s) across ${posts.length} posts`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
