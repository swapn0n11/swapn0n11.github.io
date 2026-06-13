import type { Metadata } from "next";
import { Space_Mono, Syne } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BgLayer from "@/components/BgLayer";
import Scanline from "@/components/Scanline";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-mono",
  subsets: ["latin"],
});

const syne = Syne({
  weight: ["400", "600", "800"],
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Swapnonil Nandi — Founder @ Phantom Labss",
  description: "Software developer & security researcher. Crafting privacy-first digital experiences. Founder @ Phantom Labss.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceMono.variable} ${syne.variable}`}>
      <body>
        <BgLayer />
        <Scanline />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}

