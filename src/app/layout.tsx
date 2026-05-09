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

export const metadata: Metadata = {
  title: "PreparaOSS — Concursos de Méritos CNSC",
  description:
    "Prepárate para los concursos de méritos de la CNSC con simulacros generados por IA, gamificación estilo Duolingo y competencias entre aspirantes.",
  applicationName: "PreparaOSS",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PreparaOSS",
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#FAF7F2",
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
