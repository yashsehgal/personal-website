import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thoughts about building taste #1",
};

export default function ThoughtsAboutBuildingTasteLayout({
  children,
}: LayoutProps<"/writings/thoughts-about-building-taste">) {
  return children;
}
