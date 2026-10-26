import type { Metadata } from "next";
import Script from "next/script";
import { ThemeShuffle } from "@/components/theme-shuffle";
import { TooltipProvider } from "@/components/ui/tooltip";
import { nanumMyeongjo, siteFontFamily } from "@/lib/fonts";
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
      className={nanumMyeongjo.variable}
      style={{ "--font-sans": siteFontFamily }}
      suppressHydrationWarning
    >
      <body className="min-h-svh p-8 font-sans text-sm leading-normal font-normal tracking-normal text-pretty">
        <Script id="theme-init" strategy="beforeInteractive">
          {themeBootstrapScript()}
        </Script>
        <TooltipProvider>
          {children}
          <ThemeShuffle />
        </TooltipProvider>
      </body>
    </html>
  );
}
