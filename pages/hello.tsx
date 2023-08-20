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
              Yo! I am a software engineering from
              in India. I have been working around tech
              related to frontend engineering & design from
              the last 3-4 years. I have experience working
              in large scale companies as well as, in newly
              started startups.
            </Text>
          </Wrapper>
          <Wrapper>
            <Text size='large'>
              I love building components that are minimal in
              design and fully functional & accessible for
              all sorts of users. Recently, I have been
              posting a lot of my work on{' '}
              <Anchor href='https://twitter.com/yashsehgaldev' className='font-semibold'>
                Twitter
              </Anchor>
            </Text>
          </Wrapper>
        </Section>
      </ViewContainer>
    </>
  );
};

export default Hello;
