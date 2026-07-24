"use client";

import { Reveal } from "./Reveal";
import { ContactForm } from "./ContactForm";

export function CtaBanner({ onDemoSubmitted }: { onDemoSubmitted: () => void }) {
  return (
    <section id="demo" style={{ padding: "0 0 10px" }}>
      <Reveal
        className="cta-banner reveal"
        style={{ marginLeft: "auto", marginRight: "auto", marginTop: 70 }}
      >
        <div className="cta-banner-inner">
          <h3>Ready to Transform Your HR Management?</h3>
          <p>
            Join 500+ organizations that trust Meagle 360 to manage their most
            valuable asset — their people.
          </p>
          <ul className="cta-contact-info">
            <li>
              <a href="tel:+918077313241">
                <span className="ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </span>
                +91 80773 13241
              </a>
            </li>
            <li>
              <a href="mailto:info@meagle360.com">
                <span className="ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                info@meagle360.com
              </a>
            </li>
          </ul>
        </div>
        <ContactForm title="Request a Free Demo" onSuccess={onDemoSubmitted} />
      </Reveal>
    </section>
  );
}
