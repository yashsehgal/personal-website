import type { Metadata } from "next";
import { nanumMyeongjo, siteFontFamily } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yash Sehgal",
  description: "Yash Sehgal is a design engineer.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={nanumMyeongjo.variable}
      style={{ "--font-sans": siteFontFamily }}
    >
      <body className="min-h-svh bg-white p-8 font-sans text-sm leading-normal font-normal tracking-normal text-pretty text-black">
        {children}
      </body>
    </html>
  );
}
