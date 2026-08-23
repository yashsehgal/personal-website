import { PageHeader } from "@/components/page-header";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-12">
      <PageHeader />
      {children}
    </div>
  );
}
