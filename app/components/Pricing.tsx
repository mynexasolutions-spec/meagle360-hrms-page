import { Reveal } from "./Reveal";
import { triggerRipple } from "../lib/ripple";

const CHECK = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const FEATURES = [
  "Unlimited employees",
  "Attendance, leave & payroll automation",
  "Employee self-service portal",
  "Priority support + onboarding",
  "Shift & roster management",
  "Expense & reimbursement tracking",
  "Custom reports & analytics",
  "Bank-grade data security",
];

export function Pricing() {
  return (
    <section className="section section-alt" id="pricing">
      <div className="container" style={{ textAlign: "center" }}>
        <Reveal as="span" className="eyebrow reveal">
          Simple Pricing
        </Reveal>
        <Reveal
          as="h2"
          className="reveal"
          style={{ fontSize: "clamp(26px, 3.2vw, 34px)", letterSpacing: "-0.02em", margin: "0 0 12px" }}
        >
          One Plan. Everything Included.
        </Reveal>
        <Reveal
          as="p"
          className="reveal"
          style={{ color: "var(--text-2)", fontSize: 18, maxWidth: 520, margin: "0 auto 36px" }}
        >
          No tiers, no hidden fees, just one straightforward price for your whole team.
        </Reveal>

        <Reveal className="price-card-solo reveal">
          <div className="price-card-solo-price">
            <span className="price-card-solo-plan">All-Inclusive Plan</span>
            <div className="price-amount">
              <span className="cur">₹</span>
              <span className="num">149</span>
              <span className="per">/user/mo</span>
            </div>
            <p className="price-note">Billed monthly, cancel anytime</p>
            <a href="#demo" className="btn btn-white btn-block" onClick={triggerRipple}>
              Get Started
            </a>
          </div>

          <div className="price-card-solo-features">
            <h4>Everything your team needs</h4>
            <ul className="price-features-grid">
              {FEATURES.map((f) => (
                <li key={f}>
                  {CHECK}
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
