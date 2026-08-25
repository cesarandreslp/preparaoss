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
  // Consolida el dominio: www → apex (evita contenido duplicado en SEO).
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.preparaoss.lat" }],
        destination: "https://preparaoss.lat/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
