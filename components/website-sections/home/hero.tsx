import { ThumbnailImage } from "@/components/elements/thumbnail-image";
import { ResponsiveContentControl } from "@/components/layout-utils/responsive-content-control";
import { SectionContainer } from "@/components/layout-utils/section-container";

export const HomePageHeroSection = () => {
  return (
    <SectionContainer id="home-page-hero-section">
      <ResponsiveContentControl>
        <ThumbnailImage src="/profile.jpg" alt="profile-image" size="md" />
      </ResponsiveContentControl>
    </SectionContainer>
  );
};
