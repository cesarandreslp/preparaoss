import type { MetadataRoute } from "next";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://preparaoss.lat";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin", "/dashboard", "/perfil", "/pago"],
    },
    sitemap: `${APP_URL}/sitemap.xml`,
  };
}
