import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://hasanyucedagportfolio.vercel.app"),
  applicationName: "Hasan Yücedag",
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
  manifest: "/site.webmanifest?v=2",
  icons: {
    icon: [
      { url: "/favicon.svg?v=2", type: "image/svg+xml" },
      { url: "/favicon-32x32.png?v=2", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png?v=2", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico?v=2",
    apple: [{ url: "/apple-touch-icon.png?v=2", sizes: "180x180", type: "image/png" }],
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
