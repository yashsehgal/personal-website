import { ParagraphContent } from "@/components/elements/paragraph-content";
import { ThumbnailImage } from "@/components/elements/thumbnail-image";
import { ResponsiveContentControl } from "@/components/layout-utils/responsive-content-control";
import { SectionContainer } from "@/components/layout-utils/section-container";

export const CurrentWorkDetailSection = () => {
  return (
    <SectionContainer id="current-work-details">
      <ResponsiveContentControl className="py-24 px-36">
        <div className="company-details-header flex items-start gap-4">
          <ThumbnailImage src="/logo/rocketium-logo.png" alt="rocketium-logo" />
          <div className="role-details-wrapper">
            <h2 className="leading-snug text-2xl">
              Currently working as a frontend engineer
            </h2>
            <ParagraphContent className="text-neutral-400">
              at, Rocketium
            </ParagraphContent>
          </div>
        </div>
      </ResponsiveContentControl>
    </SectionContainer>
  );
};
