import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "img.clerk.com" },
      { protocol: "https", hostname: "simo.cnsc.gov.co" },
    ],
  },
  serverExternalPackages: [
    "@napi-rs/canvas",
    "pdf-to-png-converter",
    "tesseract.js",
    "sharp",
    "unpdf",
  ],
};

export default nextConfig;
