import { BackToHomeButton } from "@/components/back-to-home-button";

export function PageHeader() {
  return (
    <header className="flex items-start justify-between">
      <BackToHomeButton />
    </header>
  );
}
