import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Thomas Sloane — Software Engineer",
    template: "%s | Thomas Sloane",
  },
  description:
    "Software engineer specializing in React, Next.js, and modern web development. Building elegant digital experiences.",
  keywords: [
    "Thomas Sloane",
    "Software Engineer",
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: "Thomas Sloane" }],
  creator: "Thomas Sloane",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://thomassloane.dev",
    title: "Thomas Sloane — Software Engineer",
    description:
      "Software engineer specializing in React, Next.js, and modern web development.",
    siteName: "Thomas Sloane",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thomas Sloane — Software Engineer",
    description:
      "Software engineer specializing in React, Next.js, and modern web development.",
    creator: "@thomassloane",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans min-h-screen bg-background text-foreground`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
