declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Fires the GA4 lead-generation event and, if a Google Ads conversion
// destination is configured, the Ads conversion event too. Both are no-ops
// if gtag.js never loaded (e.g. NEXT_PUBLIC_GA_MEASUREMENT_ID isn't set),
// so this is safe to call unconditionally from /thank-you.
export function trackDemoRequestConversion() {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", "generate_lead", {
    event_category: "demo_request",
  });

  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const conversionLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;
  if (adsId && conversionLabel) {
    window.gtag("event", "conversion", {
      send_to: `${adsId}/${conversionLabel}`,
    });
  }
}
