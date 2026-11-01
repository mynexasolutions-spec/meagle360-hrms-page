// Google Ads tag ID. Ad tag IDs are public (they appear in every page's
// source), so a default is kept here so the tag still loads in production
// even if the NEXT_PUBLIC_GOOGLE_ADS_ID env var is not set on the host.
// Override it with the env var to point at a different Ads account.
export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-18463739095";
