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
import { COMPANY_POSTAL_ADDRESS_JSONLD } from "../lib/company";

const HOME_TITLE = "Meagle 360: HR Software, HRMS & Payroll for India";
const HOME_DESCRIPTION =
  "Meagle 360 is cloud-based HR software (HRMS and HRIS) for Indian businesses: attendance, leave, payroll and employee self-service in one platform.";

export const metadata: Metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
};

const SITE_URL = "https://www.meagle360.com";

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
      address: COMPANY_POSTAL_ADDRESS_JSONLD,
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
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#software`,
      name: "Meagle 360",
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Human Resource Management System (HRIS)",
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
