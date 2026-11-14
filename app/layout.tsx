import type { Metadata } from "next";
import Script from "next/script";
import { CopyLink } from "@/components/copy-link";
import { PageSource } from "@/components/page-source";
import { SiteNav } from "@/components/site-nav";
import { ThemeShuffle } from "@/components/theme-shuffle";
import { TooltipProvider } from "@/components/ui/tooltip";
import { inter, siteFontFamily } from "@/lib/fonts";
import { themeBootstrapScript } from "@/lib/themes";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yash Sehgal",
  description: "Yash Sehgal is a design engineer.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={inter.variable}
      style={{ "--font-sans": siteFontFamily }}
      suppressHydrationWarning
    >
      {/* A full-height column, so a footer with mt-auto can rest at the
          bottom of short pages and follow the content on long ones. */}
      <body className="flex min-h-svh flex-col p-8 font-sans text-sm leading-normal font-normal tracking-[-0.01em] text-pretty">
        <Script id="theme-init" strategy="beforeInteractive">
          {themeBootstrapScript()}
        </Script>
        <TooltipProvider>
          <SiteNav />
          {children}
          <PageSource />
          <CopyLink />
          <ThemeShuffle />
        </TooltipProvider>
      </body>
    </html>
  );
}
