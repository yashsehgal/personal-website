import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Navigation using query states",
};

export default function NavigationUsingQueryStatesLayout({
  children,
}: LayoutProps<"/writings/navigation-using-query-states">) {
  return children;
}
