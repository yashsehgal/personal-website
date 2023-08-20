import { ProjectArchiveData } from '@/data/projects';
import Section from './components/layouts/section';
import ViewContainer from './components/layouts/view-container';
import Wrapper from './components/layouts/wrapper';
import Anchor from './components/ui/anchor';
import Headline from './components/ui/headline';
import Text from './components/ui/text';

import { useDencrypt } from 'use-dencrypt-effect';
import { useEffect } from 'react';

const MainView: React.FunctionComponent = () => {
  const [engineeringText, setEngineeringText] = useDencrypt("5#3%^*/<4ty$");

  useEffect(() => {
    setTimeout(() => {
      document.getElementById('engineering-text')?.click();
    }, 1000);
  }, []);

  return (
    <>
      <ViewContainer>
        <Section>
          <Anchor className='flex flex-col items-end w-fit ml-auto'>
            <Headline
              size='x-large'
              className='font-semibold'
            >
              {"Hello, I'm Yash"}
            </Headline>
            <Text>
              <span className='font-serif italic'>
                design
              </span>
              {' with '}
              <span
                className='font-mono italic tracking-tight'
                id="engineering-text"
                onClick={() =>
                  setEngineeringText('engineering')
                }
              >
                {engineeringText}
              </span>
            </Text>
          </Anchor>
        </Section>
        <Section
          id='projects-archive'
          aria-describedby='List of all my projects, crafts and archives'
          aria-label='all projects and archives'
          className='mt-32'
        >
          <Headline
            size='large'
            aria-describedby='Projects & Archive'
            aria-label='projects & archive'
          >
            {'Projects & archives'}
          </Headline>
          <Wrapper
            id='projects-wrapper'
            className='grid grid-cols-3 mt-12 items-start justify-start gap-12 max-lg:grid-cols-2 max-md:grid-cols-1'
          >
            {ProjectArchiveData?.map(
              (project, projectIndex) => (
                <>
                  {project.headline && (
                    <Wrapper
                      className='w-[240px] h-auto'
                      id='project-item'
                      aria-describedby={`Project description: ${project.description}`}
                      key={projectIndex}
                    >
                      <Anchor href={project.goto}>
                        <Headline>
                          {project.headline}
                        </Headline>
                      </Anchor>
                      <Text className='mt-2'>
                        {project.description}
                      </Text>
                    </Wrapper>
                  )}
                </>
              ),
            )}
          </Wrapper>
        </Section>
      </ViewContainer>
    </>
  );
};

export default MainView;
