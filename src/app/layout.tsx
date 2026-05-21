import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Claremont Accelerator | Start & Scale Your Startup",
  description:
    "The Claremont Accelerator helps founders start and scale startups by providing mentorship, money, and manpower.",
  keywords: ["startup", "accelerator", "Claremont Colleges", "entrepreneurship", "founders"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Aileron kept only for the navbar logo mark */}
        <link href="https://fonts.cdnfonts.com/css/aileron" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
