import sanitizeHtml from "sanitize-html";

export function sanitizePostContent(html: string): string {
  const sanitized = sanitizeHtml(html, {
    allowedTags: [
      "h2",
      "h3",
      "h4",
      "p",
      "br",
      "strong",
      "b",
      "em",
      "i",
      "u",
      "s",
      "strike",
      "a",
      "ul",
      "ol",
      "li",
      "blockquote",
      "pre",
      "code",
      "img",
      "span",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "width", "height"],
      span: ["class"],
      pre: ["class"],
      code: ["class"],
      table: ["class"],
      td: ["data-label"],
      th: ["data-label"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }),
    },
  });

  // Wrap every table in a horizontally-scrollable container. Content tables
  // are written as plain HTML (not the JSX comparison-table components
  // elsewhere on the site), so without this a wide table just overflows the
  // narrow mobile column instead of being swipeable.
  return sanitized.replace(
    /<table([^>]*)>([\s\S]*?)<\/table>/g,
    '<div class="blog-table-wrap"><table$1>$2</table></div>',
  );
}
