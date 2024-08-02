import {
  Button,
  ResponsiveButtonContainer,
} from "@/components/elements/button";
import { InteractionWrapper } from "@/components/elements/interaction-wrapper";
import { ParagraphContent } from "@/components/elements/paragraph-content";
import { ThumbnailImage } from "@/components/elements/thumbnail-image";
import { ResponsiveContentControl } from "@/components/layout-utils/responsive-content-control";
import { SectionContainer } from "@/components/layout-utils/section-container";
import { TABLER_ICON_STYLE } from "@/helpers/styles";
import { IconMail } from "@tabler/icons-react";

export const HomePageHeroSection = () => {
  return (
    <SectionContainer id="home-page-hero-section" className="mt-24">
      <ResponsiveContentControl>
        <div className="header-content-container">
          <InteractionWrapper
            initial={{ opacity: 0, scale: 0.2, rotate: -24 }}
            animate={{ opacity: 1, scale: 1, rotate: -4 }}
            whileHover={{ rotate: -2, scale: 0.9 }}
            transition={{
              type: "spring",
            }}
            withCursorPointer
          >
            <ThumbnailImage src="/profile.jpg" alt="profile-image" size="lg" />
          </InteractionWrapper>
          <div className="header-content-wrapper mt-8">
            <h1 className="leading-snug tracking-tighter font-bold text-5xl max-md:text-3xl">
              Hello, I am Yash!
            </h1>
          </div>
          <div className="body-content-container mt-4 space-y-8">
            <ParagraphContent>
              I am a design centric frontend engineer from India. Helping
              companies build better and beautiful user interfaces. Using ideal
              coding patterns, Micro interactions and Accessibility.
            </ParagraphContent>
            <ResponsiveButtonContainer className="flex items-center gap-4 justify-end max-lg:justify-normal">
              <Button
                variant="secondary"
                supportIcon={<IconMail {...TABLER_ICON_STYLE} />}
              >
                Write me a mail
              </Button>
              <Button withArrow="leading">Schedule a meet</Button>
            </ResponsiveButtonContainer>
          </div>
        </div>
      </ResponsiveContentControl>
    </SectionContainer>
  );
};
