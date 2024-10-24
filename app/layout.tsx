import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/SideBar";
import Header from "@/components/Header";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LLM Wrapper",
  description:
    "An LLM-based chat interface with real-time interaction, web scraping, and rich text editing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <SideBar />
        <Header />
        <div className="mt-10 md:mt-28 md:ml-64">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
