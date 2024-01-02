import Section from '@/components/layout/Section';
import ViewContainer from '@/components/layout/ViewContainer';
import Header from '@/components/main/Header';
import MetaHead from '@/components/seo/MetaHead';
import Tag from '@/components/ui/Tag';
import { getLearnings } from '@/lib/learnings';
import { cn } from '@/lib/utils';

interface LearningItemProps extends React.HTMLAttributes<HTMLDivElement> {
  videoURL: string;
  details: {
    title: string;
    description: string;
  };
  category?: Array<
    'design' | 'accessibilty' | 'ui/ux' | 'design-system' | 'full-stack'
  >;
}

const LearningsView: React.FunctionComponent = () => {
  return (
    <>
      <MetaHead
        title="Learnings | Yash Sehgal"
        description="My learnings while doing engineering and design in form of video logs"
        embedSource={{
          twitter:
            'https://ik.imagekit.io/eawrckp8wfi/portfolio-image-source/seo/videos%20and%20learnings_Hkwu0mKIL.png?updatedAt=1700434417751&tr=w-1200%2Ch-675%2Cfo-auto',
          linkedin:
            'https://ik.imagekit.io/eawrckp8wfi/portfolio-image-source/seo/videos%20and%20learnings_Hkwu0mKIL.png?updatedAt=1700434417751&tr=w-1200%2Ch-628%2Cfo-auto',
          og: 'https://ik.imagekit.io/eawrckp8wfi/portfolio-image-source/seo/videos%20and%20learnings_Hkwu0mKIL.png?updatedAt=1700434417751',
        }}
      />
      <div className="learnings-view-container">
        <ViewContainer className={'my-16'}>
          <Header />
          <Section>
            <h2 className="about-heading leading-snug font-medium text-base text-zinc-900">
              {'learnings.'}
            </h2>
            <div className="learnings-content-container mt-10 grid grid-cols-1 gap-6">
              {getLearnings()?.map((learning, index) => {
                return (
                  <div
                    className={cn(
                      'rounded-xl bg-white overflow-hidden',
                      'flex flex-row items-start justify-start',
                      'max-lg:grid max-lg:w-fit',
                    )}
                    key={index}>
                    <iframe
                      src={learning.videoURL}
                      allow="autoplay"
                      className="w-[300px] h-[180px] max-lg:w-full bg-zinc-200"
                      loading="lazy"
                    />
                    <div className="learning-details-wrapper p-4">
                      <h2 className="font-medium text-xl tracking-tight leading-snug max-lg:text-lg max-lg:w-[24ch]">
                        {learning.details.title}
                      </h2>
                      <p className="text-zinc-500 mt-2">
                        {learning.details.description}
                      </p>
                      {!index && <Tag className="mt-2">Latest</Tag>}
                    </div>
                  </div>
                );
              })}
            </div>
          </Section>
        </ViewContainer>
      </div>
    </>
  );
};

export default LearningsView;
export type { LearningItemProps };
