import type { Metadata } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";
import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NanoTrade | Institutional Hardware Matching",
  description: "Next-generation institutional hardware matching engines. Price-based anomaly matching built directly into the silicon logic layer.",
};

import NavBar from "@/components/NavBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth bg-black" suppressHydrationWarning>
      <body className={`${bodoni.variable} ${jost.variable} antialiased bg-black text-text`} suppressHydrationWarning>
        <NavBar />
        {children}
      </body>

    </html>
  );
}
