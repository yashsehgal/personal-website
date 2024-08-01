import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LayoutMetaData } from "@/common/constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: LayoutMetaData.title,
  description: LayoutMetaData.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
