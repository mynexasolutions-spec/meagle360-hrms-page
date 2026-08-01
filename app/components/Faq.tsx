"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";
import { FAQS } from "../../lib/faq-data";

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
