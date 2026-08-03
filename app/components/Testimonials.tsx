import { Reveal } from "./Reveal";

const METRICS = [
  { value: "5 days", label: "Average time to first payroll run" },
  { value: "₹149", label: "Flat per user, per month — every module" },
  { value: "₹0", label: "Implementation and setup fees" },
];

export function Testimonials() {
  return (
    <section className="section proof-section">
      <div className="container" style={{ textAlign: "center" }}>
        <Reveal as="span" className="eyebrow reveal">
          Early Customers, Real Results
        </Reveal>
        <Reveal
          as="h2"
          className="reveal"
          style={{ fontSize: "clamp(26px, 3.2vw, 34px)", letterSpacing: "-0.02em", margin: "0 0 40px" }}
        >
          Built for growing teams, priced honestly
        </Reveal>

        <Reveal className="reveal proof-metric-row">
          {METRICS.map((metric) => (
            <div className="proof-metric" key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </Reveal>

        <Reveal as="p" className="reveal proof-trust-line">
          Built and supported in India by{" "}
          <a href="https://nexa-solutions.in" target="_blank" rel="noopener noreferrer">
            Nexa Solutions
          </a>
          .
        </Reveal>
      </div>
    </section>
  );
}
