import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/layout/LoadingScreen";
import CustomCursor from "@/components/cursor/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Akash Ghosh | Business Analyst & Data-Driven Strategist",
  description:
    "Business Analyst specializing in requirement gathering, data analysis, and process optimization. Skilled in Python, SQL, and Power BI. Open to BA and Product Analyst roles globally.",
  keywords: [
    "Business Analyst",
    "Data Analyst",
    "Product Analyst",
    "Python",
    "SQL",
    "Power BI",
    "India",
    "Portfolio",
    "Requirements Gathering",
    "Process Optimization",
  ],
  authors: [{ name: "Akash Ghosh", url: "https://www.linkedin.com/in/akash-ghosh-57a59b341" }],
  creator: "Akash Ghosh",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Akash Ghosh | Business Analyst & Data-Driven Strategist",
    description:
      "Transforming Business Complexity Into Clarity, Strategy & Results.",
    siteName: "Akash Ghosh Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Akash Ghosh — Business Analyst Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Akash Ghosh | Business Analyst",
    description:
      "Transforming Business Complexity Into Clarity, Strategy & Results.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0B0F19] text-[#F9FAFB] overflow-x-hidden`}
      >
        <LoadingScreen />
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
