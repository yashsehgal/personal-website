import Image from 'next/image';
import Section from '../layout/Section';
import Button from '../ui/Button';
import Callout from './Callout';

const HeroSection: React.FunctionComponent = () => {
  return (
    <main className="hero-section" id="hero">
      <Section className="flex flex-row items-center justify-start gap-4 mt-12 max-sm:items-start max-md:items-start">
        <div className="profile-icon-wrapper relative w-fit h-fit">
          <Image
            src={'/media/profile.jpg'}
            alt="yash-profile"
            width={'80'}
            height={'80'}
            className="rounded-full transition-all hover:grayscale"
            priority
          />
          <div className="icon-content-wrapper animation-delay absolute px-2 py-1 bg-white shadow rounded-full text-sm left-14 bottom-0 cursor-default select-none max-sm:left-8 max-sm:text-xs max-sm:px-1 max-sm:py-0.5">
            {'🌻'}
          </div>
        </div>
        <div>
          <h1 className="welcome-text leading-snug font-semibold text-2xl text-zinc-900">
            {'👋 Hi, I am Yash'}
          </h1>
          <div className="leading-snug font-normal text-base text-zinc-500 mt-2">
            <p>
              {'A half frontend software engineer, half designer from India.'}
            </p>
            <p>{new Date().getFullYear() - 2003 + ', he/him'}</p>
          </div>
        </div>
      </Section>
      <Section>
        <h2 className="about-heading leading-snug font-medium text-base text-zinc-900">
          {'about me.'}
        </h2>
        <div className="about-content-wrapper leading-6 text-sm font-normal text-zinc-500 mt-4">
          <p>
            {
              'Hey! I am an engineer (designer, most of the times), learning how to build and design scalable websites and applications. My focus is to build with better user experience, design aesthetic, good developer experience and meaningful impact.'
            }
          </p>
        </div>
        <Callout className="mt-4">
          <p>
            {
              'I am currently open for full-time engineering roles, which involves user interface and experience design, frontend engineering as the core.'
            }
          </p>
          <p className="mt-2 mb-4">
            {
              'A collaborative team of engineers and designers, who are building great products. Interested in working together? Feel free to schedule a meet!'
            }
          </p>
          <Button onClick={() => window.open('https://cal.com/yashsehgal')}>
            {'Schedule a meet / cal.com'}
          </Button>
        </Callout>
      </Section>
    </main>
  );
};

export default HeroSection;
