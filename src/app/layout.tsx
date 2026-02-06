import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Isolatiecheck - Gratis subsidie check",
  description:
    "Ontdek in 1 minuut of uw woning in aanmerking komt voor isolatie met subsidie. Vrijblijvend en kosteloos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className={`${geistSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
