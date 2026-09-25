import type { Metadata } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hasanyucedagportfolio.vercel.app"),
  title: "Hasan Yücedag — Digital Product Studio",
  description:
    "Strategy, interface design, and fullstack engineering for digital products that look professional and perform reliably.",
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
    title: "Hasan Yücedag — Digital Product Studio",
    description: "Strategy, interface design, and fullstack engineering for ambitious digital products.",
    type: "website",
    url: "/",
    siteName: "Hasan Yücedag",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hasan Yücedag — Digital Product Studio",
    description: "Strategy, interface design, and fullstack engineering for ambitious digital products.",
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
