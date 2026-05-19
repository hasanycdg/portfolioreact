import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hasanyucedagportfolio.vercel.app"),
  title: "Hasan Yücedag — Software Engineer",
  description:
    "Fullstack engineering, AI integration, and performance work for teams that need serious software — not demos.",
  keywords: [
    "Hasan Yücedag",
    "Software Engineer",
    "Fullstack Developer",
    "Next.js",
    "TypeScript",
    "AI Integration",
    "WordPress",
    "AWS",
  ],
  openGraph: {
    title: "Hasan Yücedag — Software Engineer",
    description: "Fullstack engineering, AI integration, and performance work.",
    type: "website",
    url: "/",
    siteName: "Hasan Yücedag",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hasan Yücedag — Software Engineer",
    description: "Fullstack engineering, AI integration, and performance work.",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${sans.variable} ${mono.variable}`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
