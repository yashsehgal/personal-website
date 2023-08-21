import Section from './components/layouts/section';
import ViewContainer from './components/layouts/view-container';
import Wrapper from './components/layouts/wrapper';
import Anchor from './components/ui/anchor';
import Headline from './components/ui/headline';
import Text from './components/ui/text';

const Hello: React.FunctionComponent = () => {
  return (
    <>
      <ViewContainer>
        <Section id='hello-page-header'>
          <Headline size='x-large'>
            {"Hello, I'm Yash"}
          </Headline>
        </Section>
        <Section
          id='page-content'
          className='mt-12 grid grid-cols-1 gap-6 w-[84%]'
        >
          <Wrapper>
            <Text size='large'>
              Yo! I am a software engineering from in India.
              I have been working around tech related to
              frontend engineering & design from the last
              3-4 years. I have experience working in large
              scale companies as well as, in newly started
              startups.
            </Text>
          </Wrapper>
          <Wrapper>
            <Text size='large'>
              I love building components that are minimal in
              design and fully functional & accessible for
              all sorts of users. Recently, I have been
              posting a lot of my work on{' '}
              <Anchor
                href='https://twitter.com/yashsehgaldev'
                className='font-semibold'
              >
                Twitter
              </Anchor>
            </Text>
          </Wrapper>
          <Wrapper className='grid grid-cols-1 gap-3'>
            <Text size='large'>
              Currently, I am working at{' '}
              <Anchor
                href='https://github.com/home'
                className='font-semibold'
              >
                GitHub India
              </Anchor>{' '}
              as an Intern (Under contract with{' '}
              <Anchor
                href='https://denave.com'
                className='font-semibold'
                target='_blank'
              >
                Denave India Pvt Ltd
              </Anchor>
              ) working as a full stack engineer
            </Text>
            <Text size='large'>
              Also, working at{' '}
              <Anchor
                href='https://dunolabs.com'
                className='font-semibold'
              >
                dunolabs
              </Anchor>{' '}
              as an engineering manager. We're building
              next-generation products for companies &
              startups.
            </Text>
            <Text size='large'>
              Ex-engineering intern at{' '}
              <Anchor
                href='https://joinclamp.com'
                className='font-semibold'
              >
                Clamp
              </Anchor>
              {', '}
              <Anchor
                href='https://economize.cloud/'
                className='font-semibold'
              >
                Economize.cloud
              </Anchor>
            </Text>
          </Wrapper>
          <Wrapper>
            <Text size='large'>
              Other than tech, besides coding & designing, i
              love play instruments — i know a little{' '}
              <Anchor
                href='https://en.wikipedia.org/wiki/Tabla'
                target='_blank'
                className='font-semibold'
              >
                tabla
              </Anchor>
              , guitar & piano.
            </Text>
          </Wrapper>
          <Wrapper>
            <Text size='large'>
              Feel free to write me at{' '}
              <Anchor
                href='mailto:yashsehgal.work@gmail.com'
                target='_blank'
                className='font-semibold'
              >
                {'yashsehgal.work@gmail.com'}
              </Anchor>{' '}
              or schedule a meeting via{' '}
              <Anchor
                href='https://cal.com/yashsehgal'
                target='_blank'
                className='font-semibold'
              >
                cal.com/yashsehgal
              </Anchor>
            </Text>
          </Wrapper>
          <Wrapper>
            <Text size='large'>{'⎯ yash'}</Text>
          </Wrapper>
        </Section>
      </ViewContainer>
    </>
  );
};

export default Hello;
