import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CookieConsentBanner } from "./components/CookieConsentBanner";

// Self-hosted (variable fonts) so the build never depends on fetching Google Fonts.
const inter = localFont({
  src: "./fonts/inter-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-inter",
  display: "swap",
});

const caveat = localFont({
  src: "./fonts/caveat-latin-wght-normal.woff2",
  weight: "400 700",
  variable: "--font-caveat",
  display: "swap",
});

const SITE_URL = "https://www.meagle360.com";
const SITE_TITLE = "HRMS & HRIS Software in India for Growing Businesses | Meagle 360";
const SITE_DESCRIPTION =
  "All-in-one HRMS (HRIS) for attendance, leave, payroll and employee self-service. Flat ₹149/user/month, no setup fee, live in 5 days. Book a free demo.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Meagle 360",
  },
  description: SITE_DESCRIPTION,
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

const GTM_ID = "GTM-WSFXR8VT";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${caveat.variable}`}>
      <head>
        {/* Google Tag Manager — first thing in <head> on every page. GTM owns
            all Google tags (GA4, Ads); don't add gtag.js anywhere else. */}
        <script async src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());`,
          }}
        />
      </head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        <CookieConsentBanner />
      </body>
    </html>
  );
}
