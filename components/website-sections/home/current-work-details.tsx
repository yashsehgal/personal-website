import { ParagraphContent } from "@/components/elements/paragraph-content";
import { ThumbnailImage } from "@/components/elements/thumbnail-image";
import { ResponsiveContentControl } from "@/components/layout-utils/responsive-content-control";
import { SectionContainer } from "@/components/layout-utils/section-container";

export const CurrentWorkDetailSection = () => {
  return (
    <SectionContainer id="current-work-details">
      <ResponsiveContentControl className="p-24">
        <div className="company-details-header space-y-8">
          <ThumbnailImage
            src="/logo/rocketium-logo.png"
            alt="rocketium-logo"
            className="p-2 bg-white"
          />
          <div className="role-details-wrapper">
            <p className="leading-snug text-2xl">
              Currently working as a frontend sofware engineer at Rocketium.
              Helping the product scale in terms of design and user experience,
              by making clean, easy-to-use interfaces and components.
            </p>
            <p className="leading-snug text-2xl mt-8">
              Being a member of the product delight and UX improvement team, I
              am working closely with the product improvements. Alongside,
              building many AI-based tools for enterprises.
            </p>
          </div>
        </div>
      </ResponsiveContentControl>
    </SectionContainer>
  );
};
