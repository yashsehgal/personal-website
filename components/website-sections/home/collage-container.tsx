import { BannerImage } from "@/components/elements/banner-image";
import { InteractionWrapper } from "@/components/elements/interaction-wrapper";
import { ResponsiveContentControl } from "@/components/layout-utils/responsive-content-control";
import { SectionContainer } from "@/components/layout-utils/section-container";

const BANNER_IMAGES: { alt: string; name: string }[] = [
  { alt: "boating", name: "boating.jpg" },
  { alt: "office-desk", name: "office-desk.jpg" },
  { alt: "lake", name: "lake.jpg" },
  // { alt: "setup", name: "setup.jpg" },
  // { alt: "mountain", name: "mountain.jpg" },
];

export const HomePageCollageContainer = () => {
  return (
    <SectionContainer
      id="home-collage-container"
      className="my-24 max-lg:hidden"
    >
      <ResponsiveContentControl className="flex items-center justify-evenly">
        {BANNER_IMAGES.map((banner, index) => {
          return (
            <InteractionWrapper
              key={index}
              initial={{ opacity: 0, y: 12 * (index + 1) }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{
                y: -12,
              }}
            >
              <BannerImage src={`/media/${banner.name}`} alt={banner.alt} />
            </InteractionWrapper>
          );
        })}
      </ResponsiveContentControl>
    </SectionContainer>
  );
};
