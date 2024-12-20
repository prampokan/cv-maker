import type { Metadata } from "next";
import localFont from "next/font/local";
import { Noto_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "./(components)/navbar";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-noto-serif",
});

export const metadata: Metadata = {
  title: "CV Maker Indo",
  description: "Built your CV with just few clicks",
  icons: {
    icon: "favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSerif.variable} antialiased font-[family-name:var(--font-geist-sans)]`}
      >
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
