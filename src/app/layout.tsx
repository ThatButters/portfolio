import type { Metadata, Viewport } from "next";
import { Syne, JetBrains_Mono } from "next/font/google";
import MotionProvider from "@/components/MotionProvider";
import { siteConfig } from "@/data/portfolio";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const title = `${siteConfig.name} — ${siteConfig.role}`;
const description =
  "Code with a pulse. Full-stack developer and nurse (LPN) leading technology at Buried in Work, Heirloom & Tell and AuthorChecklist: software for the hardest days families face.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title,
  description,
  alternates: { canonical: "/" },
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  openGraph: {
    title,
    description,
    url: "/",
    siteName: siteConfig.name,
    type: "profile",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteConfig.url,
  jobTitle: siteConfig.role,
  worksFor: { "@type": "Organization", name: "Buried in Work", url: "https://buriedinwork.com" },
  award: "DAISY Award for Extraordinary Nurses (2020)",
  sameAs: Object.values(siteConfig.social),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${syne.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground noise-overlay`}
      >
        <a
          href="#biw"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:rounded focus:bg-accent focus:text-background focus:font-mono focus:text-sm"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
