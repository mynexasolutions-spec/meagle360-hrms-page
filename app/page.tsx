import type { Metadata } from "next";
import { SiteChrome } from "./components/SiteChrome";
import { Hero } from "./components/Hero";
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
  description:
    "Automate attendance, leave, payroll, and every core HR process with Meagle 360, the all-in-one HRMS software built for growing businesses.",
  alternates: {
    canonical: "/",
  },
};

const SITE_URL = "https://www.meagle360.com";

// Address/social fields are unverified — replace before this goes live.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Meagle 360",
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/logo.png`,
      parentOrganization: {
        "@type": "Organization",
        name: "Nexa Solutions",
        url: "https://nexa-solutions.in",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "REPLACE_WITH_REGISTERED_ADDRESS",
        addressLocality: "REPLACE_WITH_CITY",
        addressRegion: "REPLACE_WITH_STATE",
        postalCode: "REPLACE_WITH_POSTAL_CODE",
        addressCountry: "IN",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+91-80773-13241",
          email: "info@meagle360.com",
          contactType: "sales",
          areaServed: ["IN", "AE", "SA", "SG", "GB", "DE"],
          availableLanguage: ["en", "hi"],
        },
      ],
      sameAs: [
        "https://www.linkedin.com/company/REPLACE_WITH_LINKEDIN_HANDLE",
        "https://x.com/REPLACE_WITH_X_HANDLE",
        "https://www.youtube.com/@REPLACE_WITH_YOUTUBE_HANDLE",
      ],
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#software`,
      name: "Meagle 360",
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Human Resource Management System",
      operatingSystem: "Web, iOS, Android",
      url: `${SITE_URL}/`,
      publisher: { "@id": `${SITE_URL}/#organization` },
      featureList: [
        "Attendance management",
        "Leave management",
        "Payroll automation",
        "Shift and roster management",
        "Expense management",
        "Employee self-service",
        "Reports and analytics",
        "Exit management",
      ],
      offers: {
        "@type": "Offer",
        price: "149",
        priceCurrency: "INR",
        unitText: "per user per month",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/pricing`,
      },
    },
  ],
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
      <Features />
      <Modules />
      <Stats />
      <EmployeeCentric />
      <Pricing />
      <Faq />
      <CtaBanner />
      <Testimonials />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </SiteChrome>
  );
}
