"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";

const FAQS = [
  {
    q: "How long does implementation take?",
    a: "Most teams are fully onboarded within 3–5 business days, including data migration, payroll setup, and employee app rollout — our onboarding specialists handle the heavy lifting.",
  },
  {
    q: "Can I switch plans later?",
    a: "Yes. You can upgrade or downgrade your plan at any time from your billing settings — changes apply from the next billing cycle with no penalty.",
  },
  {
    q: "Is my company's data secure?",
    a: "All data is encrypted in transit and at rest, backed by role-based access controls and regular independent security audits, so your workforce data stays protected.",
  },
  {
    q: "Does Meagle 360 handle payroll compliance?",
    a: "Yes — statutory deductions, tax filings, and compliance reports are generated automatically and kept up to date with the latest regulations.",
  },
  {
    q: "Is there a free trial?",
    a: "You can request a personalized demo and start a 14-day free trial with full access — no credit card required to get started.",
  },
];

function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`faq-item${isOpen ? " open" : ""}`}>
      <button className="faq-q" aria-expanded={isOpen} onClick={onToggle}>
        {question}
        <span className="plus"></span>
      </button>
      <div className="faq-a" style={{ maxHeight: isOpen ? 500 : 0 }}>
        <p>{answer}</p>
      </div>
    </div>
  );
}

export function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section section-alt" id="faq">
      <div className="container">
        <div style={{ textAlign: "center" }}>
          <Reveal as="span" className="eyebrow reveal">
            FAQ
          </Reveal>
          <Reveal
            as="h2"
            className="reveal"
            style={{ fontSize: "clamp(26px, 3.2vw, 34px)", letterSpacing: "-0.02em", margin: "0 0 48px" }}
          >
            Frequently Asked Questions
          </Reveal>
        </div>
        <Reveal className="faq-list reveal">
          {FAQS.map((item, idx) => (
            <FaqItem
              key={item.q}
              question={item.q}
              answer={item.a}
              isOpen={openIndex === idx}
              onToggle={() => setOpenIndex(openIndex === idx ? -1 : idx)}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
