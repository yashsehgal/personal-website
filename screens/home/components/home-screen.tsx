import { HomeScreenAboutSummarySection } from "@/screens/home/components/home-screen-about-summary-section";
import { HomeScreenAppsListSection } from "@/screens/home/components/home-screen-apps-list-section";
import { HomeScreenFooterSection } from "@/screens/home/components/home-screen-footer-section";

export function HomeScreen() {
  return (
    <div className="flex flex-col gap-8">
      <HomeScreenAboutSummarySection />
      <HomeScreenAppsListSection />
      <div className="mt-12">
        <HomeScreenFooterSection />
      </div>
    </div>
  );
}
