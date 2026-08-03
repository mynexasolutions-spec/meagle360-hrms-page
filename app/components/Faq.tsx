import { Reveal } from "./Reveal";
import { FaqAccordion } from "./FaqAccordion";
import { FAQS } from "../../lib/faq-data";

export function Faq() {
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
        <Reveal className="reveal">
          <FaqAccordion items={FAQS} />
        </Reveal>
      </div>
    </section>
  );
}
