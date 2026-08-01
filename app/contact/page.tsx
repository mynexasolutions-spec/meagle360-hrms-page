import type { Metadata } from "next";
import { SiteChrome } from "../components/SiteChrome";
import { CtaBanner } from "../components/CtaBanner";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Meagle 360 team to request a demo, ask a question, or talk to us about your HR needs.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <SiteChrome>
      <section
        className="blog-post-banner"
        style={{ display: "flex", alignItems: "center", minHeight: "220px" }}
      >
        <div className="container">
          <h1 className="blog-post-title" style={{ textAlign: "center" }}>
            Get in Touch
          </h1>
        </div>
      </section>
      <CtaBanner />
    </SiteChrome>
  );
}
