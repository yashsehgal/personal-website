import type { Metadata } from "next";
import { Google_Sans_Flex, Reenie_Beanie } from "next/font/google";
import "./globals.css";
import { SidebarNavigationContainer } from "@/components/shared/sidebar-navigation-container";

const googleSansFlex = Google_Sans_Flex({
  variable: "--font-google-sans-flex",
  subsets: ["latin"],
  weight: "variable",
  adjustFontFallback: false,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const reenieBeanie = Reenie_Beanie({
  variable: "--font-reenie-beanie",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Yash Sehgal",
  description: "Yash Sehgal's personal website",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${googleSansFlex.variable} ${googleSansFlex.className} ${reenieBeanie.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-row font-sans items-start justify-start p-24 gap-24">
        <SidebarNavigationContainer />
        <main className="flex-1 pt-2">{children}</main>
      </body>
    </html>
  );
}
