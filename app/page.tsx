import { PageContainer } from "@/components/layout-utils/page-container";
import { HomePageCollageContainer } from "@/components/website-sections/home/collage-container";
import { CurrentWorkDetailSection } from "@/components/website-sections/home/current-work-details";
import { HomePageHeroSection } from "@/components/website-sections/home/hero";

export default function HomePage() {
  return (
    <PageContainer id="home">
      <HomePageHeroSection />
      <CurrentWorkDetailSection />
    </PageContainer>
  );
}
