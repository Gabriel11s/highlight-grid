import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Fraunces } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f5f0" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://blamq-next.lovable.app"),
  title: {
    default: "NEWS — Automotive Intelligence & Events",
    template: "%s | NEWS",
  },
  description:
    "Notícias, análises e eventos exclusivos do mercado automotivo. Tendências, networking e oportunidades para empreendedores.",
  keywords: [
    "automotivo",
    "carros",
    "eventos",
    "mercado automotivo",
    "notícias",
    "empreendedorismo",
    "dealership",
    "lojista",
    "método",
    "vendas",
  ],
  authors: [{ name: "BLAMQ" }],
  creator: "BLAMQ",
  openGraph: {
    title: "NEWS — Automotive Intelligence & Events",
    description:
      "Notícias, análises e eventos exclusivos do mercado automotivo.",
    type: "website",
    siteName: "NEWS",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "NEWS — Automotive Intelligence & Events",
    description:
      "Notícias, análises e eventos exclusivos do mercado automotivo.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
