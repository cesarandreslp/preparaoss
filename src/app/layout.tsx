import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PreparaOss — Concursos de Méritos CNSC",
  description:
    "Prepárate para los concursos de méritos de la CNSC con simulacros generados por IA, gamificación estilo Duolingo y competencias entre aspirantes.",
  applicationName: "PreparaOss",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "PreparaOss",
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#6366f1",
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
    <ClerkProvider>
      <html lang="es" className="dark">
        <head>
          <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.png" />
          <meta name="mobile-web-app-capable" content="yes" />
        </head>
        <body className={`${inter.className} bg-[#0f1623] text-white antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
