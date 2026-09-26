import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Optical spacing",
};

export default function OpticalSpacingLayout({
  children,
}: LayoutProps<"/writings/optical-spacing">) {
  return children;
}
