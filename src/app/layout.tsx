import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const sans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hasanyucedagportfolio.vercel.app"),
  title: "Hasan Yücedag | Software Engineer / Fullstack Developer",
  description:
    "Job-focused portfolio of Hasan Yücedag, Software Engineer and Fullstack Developer building production web systems, AI-powered solutions, and custom WordPress platforms.",
  keywords: [
    "Hasan Yücedag",
    "Software Engineer Zurich",
    "Fullstack Developer Switzerland",
    "WordPress Plugin Development",
    "AI Web Systems",
    "AWS",
    "Performance Optimization",
  ],
  openGraph: {
    title: "Hasan Yücedag | Software Engineer / Fullstack Developer",
    description:
      "Production-focused fullstack engineer moving to Zurich in August 2026. Experience across custom WordPress systems, cloud delivery, and AI-powered web products.",
    type: "website",
    url: "/",
    siteName: "Hasan Yücedag Portfolio",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Hasan Yücedag portfolio logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hasan Yücedag | Software Engineer / Fullstack Developer",
    description:
      "Fullstack engineer with production experience in AI web systems, WordPress engineering, and cloud deployment.",
    images: ["/android-chrome-512x512.png"],
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
    <html lang="en">
      <body className={`${sans.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
