import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://meagle360.com";
const SITE_TITLE = "Meagle 360: HRMS Software | All-in-One HR Management System";
const SITE_DESCRIPTION =
  "Meagle 360 is an all-in-one HRMS software that automates attendance, leave, payroll, and every core HR process, empowering employees and driving organizational success.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Meagle 360",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "HRMS",
    "HRMS software",
    "HR management system",
    "HR software",
    "human resource management software",
    "payroll software",
    "attendance management system",
    "leave management software",
    "employee management software",
    "HR automation software",
    "HR compliance software",
    "all-in-one HR platform",
  ],
  authors: [{ name: "Nexa Solutions", url: "https://nexa-solutions.in" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Meagle 360",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [{ url: "/hrms-image.png", width: 1200, height: 630, alt: "Meagle 360 HRMS dashboard" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/hrms-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Meagle 360",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  publisher: {
    "@type": "Organization",
    name: "Nexa Solutions",
    url: "https://nexa-solutions.in",
  },
  offers: {
    "@type": "Offer",
    priceCurrency: "INR",
    category: "SaaS",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
