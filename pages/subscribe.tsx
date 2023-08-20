import ViewContainer from '@/components/layout/ViewContainer';
import MetaHead from '@/components/seo/MetaHead';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { ClassValue } from 'clsx';
import Image from 'next/image';

const SubscribeToNewsletterView: React.FunctionComponent = () => {
  const imageWrapperClass: ClassValue = cn(
    'w-56 h-56 overflow-hidden flex flex-row items-center justify-center shadow-2xl rounded-[52px] border-4 border-black transition-all hover:shadow hover:scale-90 max-xl:w-40 max-xl:h-40 max-lg:w-24 max-lg:h-24 max-xl:rounded-[42px] max-lg:rounded-2xl max-lg:border-2 max-md:hidden',
  );
  return (
    <>
      <MetaHead
        title={'Subscribe to newsletter | Yash Sehgal'}
        description={
          'subscribe to my newsletter for frequest updates on my engineering journey. i share about my learnings, crafts and life.'
        }
        embedSource={{
          twitter:
            'https://ik.imagekit.io/eawrckp8wfi/portfolio-image-source/seo/subscribe%20to%20newsletter%20cover_beAQwH1AT.png?updatedAt=1691257541383&tr=w-1200%2Ch-675%2Cfo-auto',
          linkedin:
            'https://ik.imagekit.io/eawrckp8wfi/portfolio-image-source/seo/subscribe%20to%20newsletter%20cover_beAQwH1AT.png?updatedAt=1691257541383&tr=w-1200%2Ch-628%2Cfo-auto',
          og: 'https://ik.imagekit.io/eawrckp8wfi/portfolio-image-source/seo/subscribe%20to%20newsletter%20cover_beAQwH1AT.png?updatedAt=1691257541383',
        }}
      />
      <div className="subscribe-to-newsletter-view-container font-sans">
        <ViewContainer
          className={'my-16 flex flex-row items-stretch justify-center'}>
          <div className="hero-section-wrapper max-xl:items-start max-xl:flex max-xl:flex-col">
            {/* start: small screens collage wrapper */}
            <div className="images-wrapper-mobile hidden max-xl:flex max-xl:flex-row max-xl:items-center max-xl:justify-start max-xl:gap-3 max-xl:mb-12">
              <div className={cn(imageWrapperClass)}>
                <Image
                  src={'/media/yash-lift.png'}
                  alt="yash-elevator"
                  width={'400'}
                  height={'400'}
                />
              </div>
              <div className={cn(imageWrapperClass)}>
                <Image
                  src={'/media/club.png'}
                  alt="hard-rock-cafe"
                  width={'400'}
                  height={'400'}
                  className="h-full"
                />
              </div>
              <div className={cn(imageWrapperClass)}>
                <Image
                  src={'/media/yash.jpg'}
                  alt="god-taking-selfie"
                  width={'400'}
                  height={'400'}
                />
              </div>
              <div className={cn(imageWrapperClass)}>
                <Image
                  src={'/media/flight.png'}
                  alt="god-in-flight"
                  width={'400'}
                  height={'400'}
                />
              </div>
              <div className={cn(imageWrapperClass)}>
                <Image
                  src={'/media/cafe-laptop.png'}
                  alt="god-using-laptop-drinking-coffee"
                  width={'400'}
                  height={'400'}
                />
              </div>
            </div>
            {/* end: small screens collage wrapper */}
            <h1 className="w-[540px] text-7xl tracking-tighter font-semibold max-xl:w-[420px] max-xl:text-6xl max-md:text-5xl max-md:w-full max-md:text-center max-md:mx-auto">
              {'sharing my life learnings and experiences 🌱'}
            </h1>
            <div className="description-content-container mt-12 max-md:w-fit max-md:mx-auto">
              <h3 className="leading-snug text-lg text-[#696969] tracking-tighter font-semibold max-md:text-center">
                {'join my newsletter'}
              </h3>
              <p className="text-base mt-2 tracking-tighter font-medium text-[#898989] leading-6 w-[24ch] max-md:text-center">
                {
                  'i share about frontend concepts, ui components, tailwind, food, music, life and more ✨'
                }
              </p>
            </div>
            <Button
              className={'mt-12 max-md:mx-auto'}
              onClick={() =>
                window.open('https://yashsehgal.substack.com/embed')
              }>
              {'Subscribe to my newsletter'}
            </Button>
          </div>
          <div className="images-wrapper relative max-xl:hidden w-full">
            <div
              className={cn(
                imageWrapperClass,
                'absolute -rotate-6 left-48 top-56',
              )}>
              <Image
                src={'/media/yash-lift.png'}
                alt="yash-elevator"
                width={'400'}
                height={'400'}
              />
            </div>
            <div className={cn(imageWrapperClass, 'absolute rotate-6 left-48')}>
              <Image
                src={'/media/club.png'}
                alt="hard-rock-cafe"
                width={'400'}
                height={'400'}
                className="h-full"
              />
            </div>
            <div className={cn(imageWrapperClass, 'absolute -rotate-6')}>
              <Image
                src={'/media/yash.jpg'}
                alt="god-taking-selfie"
                width={'400'}
                height={'400'}
              />
            </div>
            <div
              className={cn(
                imageWrapperClass,
                'absolute rotate-6 top-40 left-12',
              )}>
              <Image
                src={'/media/flight.png'}
                alt="god-in-flight"
                width={'400'}
                height={'400'}
              />
            </div>
            <div className={cn(imageWrapperClass, 'absolute -rotate-6 top-72')}>
              <Image
                src={'/media/cafe-laptop.png'}
                alt="god-using-laptop-drinking-coffee"
                width={'400'}
                height={'400'}
              />
            </div>
          </div>
        </ViewContainer>
      </div>
    </>
  );
};

export default SubscribeToNewsletterView;
