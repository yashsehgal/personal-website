import Section from '@/components/layout/Section';
import ViewContainer from '@/components/layout/ViewContainer';
import MetaHead from '@/components/seo/MetaHead';

type CraftLinkType = 'internal' | 'external';
interface CraftProps {
  craftTitle?: string;
  linkType?: CraftLinkType;
  craftDescription?: string | React.ReactNode;
  craftSlug?: string;
  craftLink?: string;
}

const Crafts: React.FunctionComponent = () => {
  return (
    <>
      <MetaHead
        title={'Crafts | Yash Sehgal'}
        description={'A Collection of Hand-Crafted Frontend UI Components.'}
        embedSource={{
          twitter:
            'https://ik.imagekit.io/eawrckp8wfi/portfolio-image-source/seo/crafts?updatedAt=1679904848893&tr=w-1200%2Ch-675%2Cfo-auto',
          linkedin:
            'https://ik.imagekit.io/eawrckp8wfi/portfolio-image-source/seo/crafts?updatedAt=1679904848893&tr=w-1200%2Ch-628%2Cfo-auto',
          og: 'https://ik.imagekit.io/eawrckp8wfi/portfolio-image-source/seo/crafts?updatedAt=1679904848893',
        }}
      />
      <div className="crafts-view-container" id="crafts">
        <ViewContainer>
          <Section
            className="crafts-list-wrapper mt-8"
            id="crafts-list"
            aria-label="Crafts">
            <h2 className="about-heading leading-snug font-medium text-base text-zinc-900">
              {'crafts.'}
            </h2>
            <ul className="crafts-list mt-8"></ul>
          </Section>
        </ViewContainer>
      </div>
    </>
  );
};

export default Crafts;
export type { CraftProps };

// React.useMemo(() => (async () => await myLongAsyncFunction(args)), [args])
