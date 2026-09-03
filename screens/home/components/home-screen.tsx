import { HomeScreenAboutSummarySection } from "@/screens/home/components/home-screen-about-summary-section";
import { HomeScreenHeader } from "@/screens/home/components/home-screen-header";

export function HomeScreen() {
  return (
    <div className="flex flex-col gap-8 p-20">
      <HomeScreenHeader />
      <HomeScreenAboutSummarySection />
    </div>
  );
}
