import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
  async redirects() {
    // Canonical host is www.haciosmanogluyapi.com — send the bare domain there.
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "haciosmanogluyapi.com" }],
        destination: "https://www.haciosmanogluyapi.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
