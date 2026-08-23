import { BackToHomeButton } from "@/components/back-to-home-button";
import { HomeNavigation } from "@/features/home/components/home-navigation";

export function PageHeader() {
  return (
    <header className="flex items-center justify-between">
      <BackToHomeButton />
      <HomeNavigation />
    </header>
  );
}
