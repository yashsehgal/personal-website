import { HomeNavigation } from "@/features/home/components/home-navigation";
import { HomeProfile } from "@/features/home/components/home-profile";

export function HomeHeader() {
  return (
    <header className="flex items-start justify-between">
      <HomeProfile />
      <HomeNavigation />
    </header>
  );
}
