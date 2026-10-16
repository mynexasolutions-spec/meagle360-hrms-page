// Single source of truth for the company's postal address (NAP details).
// Previously each page hardcoded its own copy, which had already drifted —
// the privacy policy claimed "New Delhi" while other pages were unfilled.
// Update it here and every page, footer and JSON-LD block follows.

export const COMPANY_ADDRESS = {
  streetLine: "Street No. 4, Zakir Nagar, Jeevangarh",
  areaLine: "Thana Quarsi, Koil",
  city: "Aligarh",
  state: "Uttar Pradesh",
  postalCode: "202001",
  country: "India",
  countryCode: "IN",
} as const;

/** One-line form, e.g. for the footer or a meta description. */
export const COMPANY_ADDRESS_INLINE = `${COMPANY_ADDRESS.streetLine}, ${COMPANY_ADDRESS.areaLine}, ${COMPANY_ADDRESS.city}, ${COMPANY_ADDRESS.state} ${COMPANY_ADDRESS.postalCode}, ${COMPANY_ADDRESS.country}`;

/** Two-line form, as it would appear on an envelope. */
export const COMPANY_ADDRESS_LINES = [
  COMPANY_ADDRESS.streetLine,
  `${COMPANY_ADDRESS.areaLine}, ${COMPANY_ADDRESS.city}, ${COMPANY_ADDRESS.state} ${COMPANY_ADDRESS.postalCode}, ${COMPANY_ADDRESS.country}`,
];

/** schema.org PostalAddress, for JSON-LD blocks. */
export const COMPANY_POSTAL_ADDRESS_JSONLD = {
  "@type": "PostalAddress",
  streetAddress: `${COMPANY_ADDRESS.streetLine}, ${COMPANY_ADDRESS.areaLine}`,
  addressLocality: COMPANY_ADDRESS.city,
  addressRegion: COMPANY_ADDRESS.state,
  postalCode: COMPANY_ADDRESS.postalCode,
  addressCountry: COMPANY_ADDRESS.countryCode,
} as const;
