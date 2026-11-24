// Company-size buckets shared by the template lead forms and their API routes.
export const COMPANY_SIZES = ["1-10", "11-50", "51-200", "201-500", "500+"] as const;

export function isCompanySize(value: string): boolean {
  return (COMPANY_SIZES as readonly string[]).includes(value);
}
