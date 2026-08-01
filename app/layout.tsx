import type { Metadata } from "next";
import {
  Lato as FontSans,
  PT_Serif as FontSerif,
  Cascadia_Code as FontMono,
} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-sans",
});

const fontSerif = FontSerif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif",
});

const fontMono = FontMono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Yash Sehgal",
  description: "Design Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "antialiased",
        fontSans.variable,
        fontSerif.variable,
        fontMono.variable,
        "font-sans",
      )}
    >
      <body className="min-h-screen flex flex-col overflow-hidden">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
