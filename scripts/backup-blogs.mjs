/**
 * backup-blogs.mjs
 * ────────────────
 * Fetches every row from the "posts" table in Supabase
 * and writes them to  backups/blogs-backup-<timestamp>.json
 *
 * Usage:  node scripts/backup-blogs.mjs
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
 * to be set (reads from .env.local automatically).
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

// ── Resolve project root ───────────────────────────────
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// ── Load .env.local manually (no extra dep needed) ─────
function loadEnv(filePath) {
  if (!fs.existsSync(filePath)) return;
  const lines = fs.readFileSync(filePath, "utf-8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnv(path.join(ROOT, ".env.local"));

// ── Validate env vars ──────────────────────────────────
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error(
    "❌  Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local",
  );
  process.exit(1);
}

// ── Fetch all posts ────────────────────────────────────
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

console.log("📡  Connecting to Supabase…");
const { data: posts, error } = await supabase
  .from("posts")
  .select("*")
  .order("created_at", { ascending: false });

if (error) {
  console.error("❌  Failed to fetch posts:", error.message);
  process.exit(1);
}

if (!posts || posts.length === 0) {
  console.log("⚠️   No blog posts found in the database.");
  process.exit(0);
}

// ── Write backup file ──────────────────────────────────
const backupsDir = path.join(ROOT, "backups");
if (!fs.existsSync(backupsDir)) {
  fs.mkdirSync(backupsDir, { recursive: true });
}

const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const filename = `blogs-backup-${timestamp}.json`;
const filePath = path.join(backupsDir, filename);

fs.writeFileSync(filePath, JSON.stringify(posts, null, 2), "utf-8");

console.log(`✅  Backup complete — ${posts.length} post(s) saved to:`);
console.log(`    ${filePath}`);
