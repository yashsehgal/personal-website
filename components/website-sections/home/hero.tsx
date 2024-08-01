import { InteractionWrapper } from "@/components/elements/interaction-wrapper";
import { ThumbnailImage } from "@/components/elements/thumbnail-image";
import { ResponsiveContentControl } from "@/components/layout-utils/responsive-content-control";
import { SectionContainer } from "@/components/layout-utils/section-container";

export const HomePageHeroSection = () => {
  return (
    <SectionContainer id="home-page-hero-section" className="mt-24">
      <ResponsiveContentControl>
        <div className="header-content-container">
          <InteractionWrapper
            whileHover={{ rotate: -4, scale: 0.9 }}
            withCursorPointer
          >
            <ThumbnailImage src="/profile.jpg" alt="profile-image" size="md" />
          </InteractionWrapper>
          <div className="header-content-wrapper mt-4">
            <h1 className="leading-snug tracking-tighter font-bold text-5xl max-md:text-3xl">
              Hello, I am Yash! A design-centric frontend engineer from India.
            </h1>
          </div>
        </div>
      </ResponsiveContentControl>
    </SectionContainer>
  );
};
