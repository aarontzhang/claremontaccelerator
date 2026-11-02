import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Aileron is the heading face (globals.css applies it to every h1–h6) plus the
// navbar wordmark. It used to load from fonts.cdnfonts.com via a hand-written
// render-blocking <link>, which put a third-party round-trip in front of all
// heading text on every route. Self-hosted here instead: only the two weights
// the site actually uses — 700 (font-bold) and 900 (font-black).
const aileron = localFont({
  src: [
    { path: "./fonts/Aileron-Bold.woff", weight: "700", style: "normal" },
    { path: "./fonts/Aileron-Black.woff", weight: "900", style: "normal" },
  ],
  variable: "--font-aileron",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.claremontaccelerator.com"),
  title: {
    default: "Claremont Accelerator | Start & Scale Your Startup",
    template: "%s | Claremont Accelerator",
  },
  description:
    "The Claremont Accelerator helps founders start and scale startups by providing money, mentorship, and manpower.",
  keywords: ["startup", "accelerator", "Claremont Colleges", "entrepreneurship", "founders"],
  openGraph: {
    type: "website",
    siteName: "Claremont Accelerator",
    title: "Claremont Accelerator | Start & Scale Your Startup",
    description:
      "The Claremont Accelerator helps founders start and scale startups by providing money, mentorship, and manpower.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claremont Accelerator | Start & Scale Your Startup",
    description:
      "The Claremont Accelerator helps founders start and scale startups by providing money, mentorship, and manpower.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${aileron.variable}`}>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
