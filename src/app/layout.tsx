import type { Metadata, Viewport } from "next";
import { Sora, DM_Sans } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://preparaoss.lat";
const DESC =
  "Prepárate para los concursos de méritos de la CNSC con simulacros generados por nuestro sistema a la medida de tu OPEC. Practica gratis, paga solo por tu cargo.";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: "PreparaOSS — Concursos de Méritos CNSC",
  description: DESC,
  applicationName: "PreparaOSS",
  manifest: "/manifest.json",
  icons: { icon: "/favicon.png", apple: "/icons/icon-192x192.png" },
  openGraph: {
    title: "PreparaOSS — Prepárate hoy, conquista tu mañana",
    description: DESC,
    url: APP_URL,
    siteName: "PreparaOSS",
    images: [{ url: "/og.png", width: 1200, height: 480, alt: "PreparaOSS" }],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PreparaOSS — Concursos de Méritos CNSC",
    description: DESC,
    images: ["/og.png"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PreparaOSS",
  },
  formatDetection: { telephone: false },
  // Verificación de Google Search Console (solo emite la meta-tag si el env está).
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: "#0B1733",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${sora.variable} ${dmSans.variable}`}>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="antialiased">
        {/* Sello institucional — bandera de Colombia (top de documento) */}
        <div className="flag-stripe" aria-hidden="true" />
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
