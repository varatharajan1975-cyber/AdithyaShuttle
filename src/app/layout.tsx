import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter, Instrument_Serif } from "next/font/google";
import { BRAND, SITE_URL } from "@/content/site";
import { StructuredData } from "@/components/structured-data";
import "./globals.css";

/**
 * Three faces, each with one job.
 *
 * Bricolage Grotesque carries the headings: it has real character at display
 * sizes, where the previous geometric sans went generic. Instrument Serif is
 * loaded in italic only and used for a single accent word per heading — that
 * one contrast does more for the page than any amount of gradient ever did.
 * Inter stays for body copy, where neutrality is the point.
 */
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const TITLE = `${BRAND.name} — Badminton Courts & Coaching in Chennai`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${BRAND.name}`,
  },
  description: BRAND.description,
  applicationName: BRAND.name,
  keywords: [
    "badminton academy Chennai",
    "badminton court Thirumullaivoyal",
    "badminton court Madhavaram",
    "badminton coaching Chennai",
    "book badminton court Chennai",
    "Adithya Sports Academy",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: BRAND.name,
    title: TITLE,
    description: BRAND.description,
    url: SITE_URL,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: BRAND.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0908",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${bricolage.variable} ${instrument.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        {/*
          Scroll-reveal animations start elements at opacity 0. If the bundle
          fails or scripts are disabled, this forces every one of them visible
          so no content is ever lost to a broken script.
        */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col bg-canvas">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:rounded-full focus:bg-amber-400 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-canvas"
        >
          Skip to content
        </a>
        {children}
        <StructuredData />
      </body>
    </html>
  );
}
