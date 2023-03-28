import Image from 'next/image';
import Section from '../layout/Section';
import Button from '../ui/Button';
import LinkText from '../ui/LinkText';
import Callout from './Callout';
import Header from './Header';

const HeroSection: React.FunctionComponent = () => {
  return (
    <main className="hero-section" id="hero">
      <Header />
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
          <div className="flex flex-row items-center justify-start gap-4">
            <Button onClick={() => window.open('https://cal.com/yashsehgal')}>
              {'Schedule a meet / cal.com'}
            </Button>
            <LinkText
              href={'/resume'}
              className="text-zinc-600 font-medium text-sm">
              {'Resume'}
            </LinkText>
          </div>
        </Callout>
      </Section>
    </main>
  );
};

export default HeroSection;
