import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

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
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
