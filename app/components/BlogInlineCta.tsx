// Mid-article demo CTA for blog posts. Copy is picked by post slug so the
// pitch matches what the reader came for (spreadsheet templates, HRMS price
// comparisons, or general HR/payroll reading).

type Variant = "spreadsheet" | "pricing" | "default";

const COPY: Record<Variant, { title: string; text: string }> = {
  spreadsheet: {
    title: "Outgrown your Excel employee sheet?",
    text: "Meagle 360 keeps employee records, attendance, leave and payroll in one place. We move your existing spreadsheet data in during onboarding, so nobody has to re-type records.",
  },
  pricing: {
    title: "Comparing HRMS prices?",
    text: "Meagle 360 is a flat ₹149 per user per month with every module included: attendance, leave, payroll, shifts and self-service. No setup fee and no minimum seats.",
  },
  default: {
    title: "Run HR without the spreadsheets",
    text: "Meagle 360 puts attendance, leave and payroll in one app. Run payroll within 1 click, and every employee gets their payslip in their own account. Flat ₹149 per user per month.",
  },
};

function variantFor(slug: string): Variant {
  if (/template|excel|spreadsheet|employee-database/.test(slug)) return "spreadsheet";
  if (/pricing|price|cost|alternative|best-hrms|best-hris|keka|zoho|greythr|free-hrms|worth-it/.test(slug)) return "pricing";
  return "default";
}

export function BlogInlineCta({ slug }: { slug: string }) {
  const variant = variantFor(slug);
  const { title, text } = COPY[variant];
  return (
    <aside className="blog-inline-cta" aria-label="Meagle 360 demo">
      <p className="blog-inline-cta-title">{title}</p>
      <p className="blog-inline-cta-text">{text}</p>
      <div className="blog-inline-cta-actions">
        <a href="/demo" className="btn btn-primary" data-cta="blog-inline" data-cta-variant={variant}>
          Book a free demo
        </a>
        <a href="/pricing" className="btn btn-outline" data-cta="blog-inline-pricing" data-cta-variant={variant}>
          See pricing
        </a>
      </div>
    </aside>
  );
}
