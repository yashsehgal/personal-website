import { Inter } from "next/font/google";

const arialSeries = [
  "Arial",
  "Arial Narrow",
  "Arial Rounded MT Bold",
  "Arial Unicode MS",
  "sans-serif",
] as const;

function fontFamilyName(name: string) {
  return name.includes(" ") ? `"${name}"` : name;
}

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

/** Helvetica, then Inter, then the Arial sans-serif series. */
export const sansFontFamily = [
  "Helvetica",
  "Inter",
  ...arialSeries.map(fontFamilyName),
].join(", ");
