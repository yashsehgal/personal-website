import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { LayoutMetaData } from "@/common/constants";

const manrope = Manrope({ subsets: ["latin"] });

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
      <body className={manrope.className}>{children}</body>
    </html>
  );
}
