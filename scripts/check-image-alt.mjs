/**
 * check-image-alt.mjs
 * -------------------
 * Fails (exit 1) if any <img> or next/image <Image> in app/**\/*.tsx has no
 * alt attribute. Decorative images should use alt="".
 *
 * Usage:  npm run check:alt
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "app");

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (full.endsWith(".tsx")) out.push(full);
  }
  return out;
}

let missing = 0;
for (const file of walk(root)) {
  const src = fs.readFileSync(file, "utf8");
  const re = /<(img|Image)\b/g;
  let m;
  while ((m = re.exec(src))) {
    // Walk to the end of the tag, ignoring ">" inside {...} prop expressions.
    let i = m.index + m[0].length;
    let depth = 0;
    for (; i < src.length; i++) {
      const ch = src[i];
      if (ch === "{") depth++;
      else if (ch === "}") depth--;
      else if (ch === ">" && depth === 0) break;
    }
    const tag = src.slice(m.index, i + 1);
    if (!/\balt\s*=/.test(tag) && !/\{\.\.\./.test(tag)) {
      missing++;
      const line = src.slice(0, m.index).split("\n").length;
      console.log(`${path.relative(process.cwd(), file)}:${line}  <${m[1]}> has no alt`);
    }
  }
}

if (missing) {
  console.error(`\n${missing} image(s) without alt.`);
  process.exit(1);
}
console.log("All images have an alt attribute.");
