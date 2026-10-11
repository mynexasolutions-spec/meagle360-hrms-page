// Rule-based knowledge base for the floating chat assistant. Every answer
// here is grounded in this site's own published content (pricing page,
// feature pages, templates library) — nothing is invented. When adding a
// new entry, prefer linking to the real page over restating everything in
// the chat bubble, so the content stays accurate if that page changes.

export type FaqEntry = {
  id: string;
  /** Lowercase keywords/phrases that trigger this answer. Matched as substrings against the visitor's message. */
  keywords: string[];
  answer: string;
  /** Optional link shown as a small "Learn more" chip under the answer. */
  link?: { label: string; href: string };
};

export const FAQ_ENTRIES: FaqEntry[] = [
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
    id: "attendance",
    keywords: ["attendance", "check-in", "check in", "biometric", "geo-tag", "geo tag", "punch"],
    answer:
      "Our Attendance Management module tracks attendance across office, field and remote teams with geo-tagged mobile check-ins, biometric/device integration, and approval workflows — and it flows straight into payroll automatically.",
    link: { label: "Attendance Management", href: "/features/attendance-management-software" },
  },
  {
    id: "payroll",
    keywords: ["payroll", "salary", "payslip", "ctc", "in-hand", "in hand", "compliance", "pf", "esi", "tds"],
    answer:
      "The Payroll module runs payroll directly from your attendance and leave data, handles statutory compliance, and generates/distributes payslips automatically — no manual reconciliation each cycle.",
    link: { label: "Payroll Software", href: "/features/payroll-software" },
  },
  {
    id: "leave",
    keywords: ["leave", "pto", "time off", "vacation", "sick leave"],
    answer:
      "Leave Management gives employees self-service leave requests, configurable policies, manager approval workflows and real-time balance tracking, linked to attendance and payroll.",
    link: { label: "Leave Management", href: "/features/leave-management-software" },
  },
  {
    id: "shift",
    keywords: ["shift", "roster", "schedule", "rota"],
    answer:
      "Shift Management handles rotating and fixed shift patterns, shift swaps, roster visibility and shift-based pay differentials, synced straight to attendance and payroll.",
    link: { label: "Shift Management", href: "/features/shift-management-software" },
  },
  {
    id: "self-service",
    keywords: ["self service", "self-service", "employee portal", "ess"],
    answer:
      "The Employee Self-Service portal lets employees check payslips, apply for leave, view attendance and manage their own details — cutting down routine HR requests.",
    link: { label: "Employee Self-Service", href: "/features/employee-self-service" },
  },
  {
    id: "employee-database",
    keywords: ["employee database", "employee records", "employee directory", "hr spreadsheet"],
    answer: "Employee Database software gives you a centralized, searchable employee directory that replaces the HR spreadsheet.",
    link: { label: "Employee Database", href: "/features/employee-database-software" },
  },
  {
    id: "expense",
    keywords: ["expense", "reimbursement", "reimburse"],
    answer:
      "Expense Management lets employees submit expenses from their phone and get reimbursed without paperwork chains.",
    link: { label: "Expense Management", href: "/features/expense-management" },
  },
  {
    id: "reports",
    keywords: ["report", "reports", "analytics", "dashboard", "insight"],
    answer: "HR Reports & Analytics are built from your live workforce data — attendance, leave, payroll and hiring trends, without a custom build.",
    link: { label: "HR Reports & Analytics", href: "/features/hr-reports-analytics" },
  },
  {
    id: "hiring",
    keywords: ["hiring", "recruitment", "recruit", "job posting", "candidate", "onboarding", "applicant"],
    answer: "Hiring Management takes you from job posting to candidate pipeline to Day One onboarding, all in one place.",
    link: { label: "Hiring Management", href: "/features/hiring-management-software" },
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

const GREETING =
  "Hi, I'm the Meagle360 assistant 🦅 Ask me about pricing, features, or anything else about Meagle 360.";

const FALLBACK =
  "I'm not totally sure about that one — but our team can help directly. Try WhatsApp (the button next to me) or the contact page.";

export function matchFaq(message: string): FaqEntry | null {
  const lower = message.toLowerCase();
  let best: { entry: FaqEntry; score: number } | null = null;
  for (const entry of FAQ_ENTRIES) {
    for (const kw of entry.keywords) {
      if (lower.includes(kw)) {
        // Longer keyword matches are more specific — prefer them when a
        // message happens to match more than one entry.
        const score = kw.length;
        if (!best || score > best.score) best = { entry, score };
      }
    }
  }
  return best?.entry ?? null;
}

export function getGreeting() {
  return GREETING;
}

export function getFallback() {
  return FALLBACK;
}

export const QUICK_QUESTIONS = [
  "What's the pricing?",
  "What modules do you offer?",
  "How do I book a demo?",
];
