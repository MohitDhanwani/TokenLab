import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Space_Mono } from "next/font/google";
import "./globals.css"
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-playfair",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});


export const metadata: Metadata = {
  title: "TokenLabs",
  description: "Create your token without writing any single line of code | No Code platform to create Tokens",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceMono.variable} ${playfair.variable} antialiased`}
      >
        <Navbar/>

        {children}
      </body>
    </html>
  );
}
