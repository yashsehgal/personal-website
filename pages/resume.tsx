import Section from '@/components/layout/Section';
import ViewContainer from '@/components/layout/ViewContainer';
import MetaHead from '@/components/seo/MetaHead';
import Button from '@/components/ui/Button';
import LinkText from '@/components/ui/LinkText';
import Image from 'next/image';

const ResumeView: React.FunctionComponent = () => {
  return (
    <>
      <MetaHead
        title={'Resume | Yash Sehgal'}
        description={
          'Checkout resume of Yash Sehgal. On Google Drive or Download as a PDF'
        }
        embedSource={{
          twitter:
            'https://ik.imagekit.io/eawrckp8wfi/portfolio-image-source/seo/resume?updatedAt=1679493738907&tr=w-1200%2Ch-675%2Cfo-auto',
          linkedin:
            'https://ik.imagekit.io/eawrckp8wfi/portfolio-image-source/seo/resume?updatedAt=1679493738907&tr=w-1200%2Ch-628%2Cfo-auto',
          og: 'https://ik.imagekit.io/eawrckp8wfi/portfolio-image-source/seo/resume?updatedAt=1679493738907&tr=w-1200%2Ch-630%2Cfo-auto',
        }}
      />
      <div className="resume-view-container">
        <ViewContainer className={'my-6'}>
          <Image
            src={'/media/resume.png'}
            width={'360'}
            height={'200'}
            alt={'resume-cover'}
            className={'resume-cover rounded-md border shadow-lg mx-auto'}
            priority
          />
          <Section
            className={
              'resume-viewer-actions-list-wrapper mt-8 mx-auto w-fit flex flex-row items-center justify-start gap-4'
            }>
            <Button
              onClick={() =>
                window.open(
                  'https://drive.google.com/file/d/1ZZbyTET-RbX2eAhRxK4y5bp9oK3PCGOV/view?usp=sharing',
                )
              }>
              {'Resume on Drive'}
            </Button>
            <Button
              onClick={() => (window.location.href = '/utils/resume.pdf')}>
              {'Resume as PDF'}
            </Button>
          </Section>
          <LinkText href={'/'} className={'mx-auto w-fit mt-12'}>
            {'Back to home'}
          </LinkText>
        </ViewContainer>
      </div>
    </>
  );
};

export default ResumeView;
