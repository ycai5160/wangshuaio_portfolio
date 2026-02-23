import type { Metadata } from "next";
import { Geist, Geist_Mono, Great_Vibes, Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import "lenis/dist/lenis.css";
import SmoothScroll from "./components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  weight: "400",
  variable: "--font-great-vibes",
  subsets: ["latin"],
});

const notoSansSC = Noto_Sans_SC({
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-sans-sc",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "王帅鸥 | 监制 | 制片",
  description: "王帅鸥的个人作品集",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${greatVibes.variable} ${notoSansSC.variable} antialiased bg-white text-stone-950`}
      >
        <SmoothScroll />
        <div className="grain"></div>
        {children}
      </body>
    </html>
  );
}
