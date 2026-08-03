"use client";

import { useState } from "react";

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

export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="faq-list">
      {items.map((item, idx) => (
        <FaqItem
          key={item.q}
          question={item.q}
          answer={item.a}
          isOpen={openIndex === idx}
          onToggle={() => setOpenIndex(openIndex === idx ? -1 : idx)}
        />
      ))}
    </div>
  );
}
