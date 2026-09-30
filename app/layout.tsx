import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { DynamicFavicon } from "@/components/dynamic-favicon";
import { InterfaceSoundListener } from "@/components/interface-sound-listener";
import { MainLayoutContainer } from "@/components/layouts/main-layout-container";
import { PageScrollbar } from "@/components/page-scrollbar";
import { QueryProvider } from "@/components/query-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Suspense } from "react";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Yash Sehgal",
    template: "Yash Sehgal - %s",
  },
  description: "Yash Sehgal (YS) is a design engineer",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <DynamicFavicon />
        <InterfaceSoundListener />
        <PageScrollbar />
        <QueryProvider>
          <Suspense>
            <NuqsAdapter>
              <MainLayoutContainer>{children}</MainLayoutContainer>
            </NuqsAdapter>
          </Suspense>
        </QueryProvider>
      </body>
    </html>
  );
}
