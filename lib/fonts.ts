import { Inter } from "next/font/google";

// Inter is a variable font, so every weight comes from one file.
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const siteFontFamily = "var(--font-inter), sans-serif";
