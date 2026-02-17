import type { Metadata } from "next";
import { Syne, JetBrains_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Charles Beeman — Software Developer & AI Integration Specialist",
  description:
    "Software developer and founder building AI-powered web applications with Python, Node.js, React, and LLM integration.",
  openGraph: {
    title: "Charles Beeman — Software Developer & AI Integration Specialist",
    description:
      "Software developer and founder building AI-powered web applications.",
    type: "website",
  },
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
        {children}
      </body>
    </html>
  );
}
