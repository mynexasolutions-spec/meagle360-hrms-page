"use client";

import { useEffect, useState } from "react";
import { ContactForm } from "./ContactForm";

const OPEN_DELAY_MS = 15000;

export function DemoPopup({ onSuccess }: { onSuccess: () => void }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), OPEN_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="popup-overlay" role="dialog" aria-modal="true" aria-label="Request a demo">
      <div className="popup-panel">
        <button
          className="popup-close"
          aria-label="Close"
          onClick={() => setOpen(false)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        <ContactForm
          title="Get a Free Demo"
          onSuccess={() => {
            onSuccess();
            setOpen(false);
          }}
        />
      </div>
    </div>
  );
}
