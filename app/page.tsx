import { PageContainer } from "@/components/layouts/page-container";
import HeroSection from "@/components/sections/hero-section";
import RecentWorks from "@/components/sections/recent-work";

export default function Home() {
  return <PageContainer className="home-page">
    <HeroSection />
    <RecentWorks />
  </PageContainer>
}