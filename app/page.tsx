import type { Metadata } from "next";
import { SiteChrome } from "./components/SiteChrome";
import { Hero } from "./components/Hero";
import { LogoStrip } from "./components/LogoStrip";
import { Features } from "./components/Features";
import { Modules } from "./components/Modules";
import { Stats } from "./components/Stats";
import { EmployeeCentric } from "./components/EmployeeCentric";
import { Pricing } from "./components/Pricing";
import { Testimonials } from "./components/Testimonials";
import { Faq } from "./components/Faq";
import { CtaBanner } from "./components/CtaBanner";
import { FAQS } from "../lib/faq-data";

export const metadata: Metadata = {
  title: "HRMS Software for Modern HR Teams",
  description:
    "Automate attendance, leave, payroll, and every core HR process with Meagle 360, the all-in-one HRMS software built for growing businesses.",
  alternates: {
    canonical: "/",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export default function Home() {
  return (
    <SiteChrome>
      <Hero />
      <LogoStrip />
      <Features />
      <Modules />
      <Stats />
      <EmployeeCentric />
      <Pricing />
      <Testimonials />
      <Faq />
      <CtaBanner />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </SiteChrome>
  );
}
