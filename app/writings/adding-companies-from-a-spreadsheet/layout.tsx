import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bulk CSV Handling",
};

export default function AddingCompaniesFromASpreadsheetLayout({
  children,
}: LayoutProps<"/writings/adding-companies-from-a-spreadsheet">) {
  return children;
}
