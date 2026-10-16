// Knowledge base + matcher for the floating chat assistant. Every answer is
// grounded in this site's own published content — nothing is invented.
//
// Two layers:
// 1. PRIORITY_ENTRIES — a small hand-written set of concise, branded answers
//    for the highest-traffic topics (pricing, modules overview, demo...),
//    matched first via direct keyword substring so they win over the pool
//    even when a pool FAQ also mentions the same words.
// 2. The POOL — every FAQ already published on the site (general FAQ
//    section, pricing page, and all 9 feature pages — 120+ Q&A pairs),
//    imported directly from their source files so this stays in sync
//    automatically if that content ever changes. Matched by keyword-overlap
//    scoring against the visitor's message, so the bot can answer the long
//    tail of real questions without anyone hand-curating keywords for each one.

import { FEATURE_PAGES } from "./features-data";
import { FAQS as GENERAL_FAQS } from "./faq-data";
import { PRICING_FAQS } from "./pricing-data";

export type FaqLink = { label: string; href: string };
export type FaqEntry = { id: string; keywords: string[]; answer: string; link?: FaqLink };
export type FaqAnswer = { answer: string; link?: FaqLink };

const PRIORITY_ENTRIES: FaqEntry[] = [
  {
    id: "pricing",
    keywords: ["price", "pricing", "cost", "how much", "charge", "fee", "fees", "plan", "plans", "expensive", "cheap"],
    answer:
      "Meagle 360 is a flat ₹149 per user, per month — every module (attendance, leave, payroll, shifts, self-service, hiring, expenses and reports) is included at that one price. No setup fee, no minimum seats.",
    link: { label: "See pricing", href: "/pricing" },
  },
  {
    id: "free-trial",
    keywords: ["free trial", "trial", "demo account", "try it", "try before"],
    answer:
      "You can start a free trial or book a 15-minute live demo — our team will walk you through the modules relevant to you.",
    link: { label: "Start free trial", href: "/demo" },
  },
  {
    id: "demo",
    keywords: ["demo", "book a call", "schedule a call", "talk to sales", "show me"],
    answer: "I can get you booked for a quick 15-minute demo with our team — just share your details on the demo page.",
    link: { label: "Book a demo", href: "/demo" },
  },
  {
    id: "templates",
    keywords: ["template", "templates", "letter", "offer letter", "hr letter", "hr form", "hr policy"],
    answer:
      "We have a free library of ready-to-use HR letter and policy templates — offer letters, warning letters, probation confirmation, and more.",
    link: { label: "Browse HR Templates", href: "/templates" },
  },
  {
    id: "contact",
    keywords: ["contact", "support", "talk to someone", "human", "call you", "reach you", "email you"],
    answer: "You can reach our team directly on WhatsApp using the button right next to me, or through the contact page.",
    link: { label: "Contact us", href: "/contact" },
  },
  {
    id: "what-is-meagle",
    keywords: ["what is meagle", "what does meagle", "about meagle", "what do you do", "who are you"],
    answer:
      "Meagle 360 is an all-in-one HRMS — attendance, leave, payroll, shifts, employee self-service, hiring, expenses and reports in one system, at a flat ₹149/user/month.",
    link: { label: "Explore features", href: "/#features" },
  },
  {
    id: "modules",
    keywords: ["modules", "what modules", "features do you have", "what features", "what’s included", "whats included", "what's included"],
    answer:
      "Every plan includes 8 modules: Attendance, Payroll, Leave, Shift Management, Employee Self-Service, Employee Database, Expense Management, HR Reports & Hiring — all for one flat price, nothing sold separately.",
    link: { label: "Explore features", href: "/#features" },
  },
];

// ---- The pool: every FAQ already published on the site ----

type PoolEntry = { question: string; answer: string; link?: FaqLink; tokens: Set<string> };

const STOPWORDS = new Set([
  "the", "is", "a", "an", "do", "does", "did", "what", "how", "can", "could", "i", "you", "your", "my",
  "for", "of", "to", "in", "on", "with", "and", "or", "be", "are", "it", "this", "that", "me", "we",
  "will", "would", "should", "if", "have", "has", "had", "get", "there", "their", "them", "so", "about",
  "any", "all", "when", "where", "who", "which", "from", "as", "at", "by", "not", "no", "yes",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOPWORDS.has(w));
}

/** A browsable group of questions, shown as a menu inside the chat. */
export type FaqTopic = {
  id: string;
  label: string;
  questions: { q: string; a: string; link?: FaqLink }[];
};

/**
 * Every FAQ published on the site, grouped by topic. This is the single
 * source for both the browsable menu in the chat and the keyword matcher
 * below, so the two can never drift apart.
 */
export const FAQ_TOPICS: FaqTopic[] = [
  {
    id: "general",
    label: "Getting started",
    questions: GENERAL_FAQS.map((f) => ({ q: f.q, a: f.a, link: { label: "See all FAQs", href: "/#faq" } })),
  },
  {
    id: "pricing",
    label: "Pricing & billing",
    questions: PRICING_FAQS.map((f) => ({ q: f.q, a: f.a, link: { label: "See pricing", href: "/pricing" } })),
  },
  ...FEATURE_PAGES.map((feature) => ({
    id: feature.slug,
    label: feature.navLabel,
    questions: feature.faqs.map((f) => ({
      q: f.q,
      a: f.a,
      link: { label: feature.navLabel, href: `/features/${feature.slug}` },
    })),
  })),
];

function buildPool(): PoolEntry[] {
  const pool: PoolEntry[] = [];
  for (const topic of FAQ_TOPICS) {
    for (const faq of topic.questions) {
      pool.push({
        question: faq.q,
        answer: faq.a,
        link: faq.link,
        tokens: new Set(tokenize(faq.q)),
      });
    }
  }
  return pool;
}

// Built once at module load — the pool and its tokens don't change at runtime.
const POOL = buildPool();

/** Total number of questions the bot can answer from the menu. */
export const FAQ_COUNT = POOL.length;
const MIN_POOL_SCORE = 5; // roughly: at least one real word (4+ letters) in common

// A pool match this strong (several real words in common with a specific
// published FAQ) is almost always more precisely relevant than a generic
// priority answer, even when a priority keyword also happens to match —
// e.g. "Is GST included in the price?" should get the GST-specific pricing
// FAQ, not the generic "pricing" blurb just because it contains "price".
const POOL_BEATS_PRIORITY_SCORE = 10;

function matchPriority(message: string): { answer: FaqAnswer; score: number } | null {
  const lower = message.toLowerCase();
  let best: { entry: FaqEntry; score: number } | null = null;
  for (const entry of PRIORITY_ENTRIES) {
    for (const kw of entry.keywords) {
      if (lower.includes(kw)) {
        const score = kw.length;
        if (!best || score > best.score) best = { entry, score };
      }
    }
  }
  return best ? { answer: { answer: best.entry.answer, link: best.entry.link }, score: best.score } : null;
}

function matchPool(message: string): { answer: FaqAnswer; score: number } | null {
  const userTokens = tokenize(message);
  if (userTokens.length === 0) return null;

  let best: { entry: PoolEntry; score: number } | null = null;
  for (const entry of POOL) {
    let score = 0;
    for (const t of userTokens) {
      if (entry.tokens.has(t)) score += t.length;
    }
    if (score > 0 && (!best || score > best.score)) best = { entry, score };
  }

  if (best && best.score >= MIN_POOL_SCORE) {
    return { answer: { answer: best.entry.answer, link: best.entry.link }, score: best.score };
  }
  return null;
}

export function matchFaq(message: string): FaqAnswer | null {
  const priority = matchPriority(message);
  const pool = matchPool(message);

  if (pool && pool.score >= POOL_BEATS_PRIORITY_SCORE) return pool.answer;
  if (priority) return priority.answer;
  return pool?.answer ?? null;
}

const GREETING =
  "Hi, I'm the Meagle360 assistant 🦅 Type a question, or pick a topic below to browse what people usually ask.";

const FALLBACK =
  "I'm not totally sure about that one — but our team can help directly. Try WhatsApp (the button next to me) or the contact page. You can also browse the topics below.";

export function getGreeting() {
  return GREETING;
}

export function getFallback() {
  return FALLBACK;
}

/** Shown above the topic menu as one-tap shortcuts for the most common asks. */
export const QUICK_QUESTIONS = [
  "What's the pricing?",
  "What modules do you offer?",
  "How do I book a demo?",
];

export function getTopic(id: string): FaqTopic | undefined {
  return FAQ_TOPICS.find((t) => t.id === id);
}
