/** @type {import('next').NextConfig} */
const nextConfig = {
  // The "all-in-one HRMS" post was merged into the main "best HRMS software in
  // India" page, so the old URL redirects permanently to avoid two pages
  // competing for the same search intent.
  async redirects() {
    return [
      {
        source: "/blog/best-all-in-one-hrms-software-for-growing-businesses-in-2026",
        destination: "/blog/best-hrms-software-india-2026",
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
