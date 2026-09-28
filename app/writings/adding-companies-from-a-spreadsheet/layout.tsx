import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV imports for adding accounts in Octolane",
};

export default function AddingCompaniesFromASpreadsheetLayout({
  children,
}: LayoutProps<"/writings/adding-companies-from-a-spreadsheet">) {
  return children;
}
