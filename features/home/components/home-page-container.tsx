import { HomeBio } from "@/features/home/components/home-bio";
import { HomeConnect } from "@/features/home/components/home-connect";
import { HomeEmailCta } from "@/features/home/components/home-email-cta";
import { HomeHeader } from "@/features/home/components/home-header";

export function HomePageContainer() {
  return (
    <div className="p-8 space-y-12">
      <HomeHeader />
      <div className="space-y-8">
        <HomeBio />
        <HomeConnect />
      </div>
      <HomeEmailCta />
    </div>
  );
}
