import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { PAGE_THEME_BOOTSTRAP_SCRIPT } from "@/common/page-theme";
import { MainLayoutController } from "@/components/layouts/main-layout-controller";
import { PageThemeController } from "@/components/layouts/page-theme-controller";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yash Sehgal",
  description: "Hi I am Yash and I do design engineering",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script
          id="page-theme-bootstrap"
          strategy="beforeInteractive"
        >
          {PAGE_THEME_BOOTSTRAP_SCRIPT}
        </Script>
        <PageThemeController />
        <MainLayoutController>{children}</MainLayoutController>
      </body>
    </html>
  );
}
