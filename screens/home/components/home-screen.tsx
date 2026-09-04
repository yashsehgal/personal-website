import { HomeScreenAboutSummarySection } from "@/screens/home/components/home-screen-about-summary-section";
import { HomeScreenAppsListSection } from "@/screens/home/components/home-screen-apps-list-section";

export function HomeScreen() {
  return (
    <div className="flex flex-col gap-8 p-20">
      <HomeScreenAboutSummarySection />
      <HomeScreenAppsListSection />
    </div>
  );
}
