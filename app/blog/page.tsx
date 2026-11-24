import type { Metadata } from "next";
import { BlogIndexView } from "../components/BlogIndexView";

export const metadata: Metadata = {
  title: "HR Blog: HRMS Tips, Payroll & HR Best Practices",
  description:
    "Insights on HRMS software, payroll compliance, attendance management, and HR best practices from the Meagle 360 team.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "HR Blog: HRMS Tips, Payroll & HR Best Practices",
    description:
      "Insights on HRMS software, payroll compliance, attendance management, and HR best practices from the Meagle 360 team.",
    url: "/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HR Blog: HRMS Tips, Payroll & HR Best Practices",
    description:
      "Insights on HRMS software, payroll compliance, attendance management, and HR best practices from the Meagle 360 team.",
  },
};

export const revalidate = 60;

export default function BlogIndexPage() {
  return <BlogIndexView page={1} />;
}
