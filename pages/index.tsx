import Section from './components/layouts/section';
import ViewContainer from './components/layouts/view-container';
import Headline from './components/ui/headline';

const MainView: React.FunctionComponent = () => {
  return (
    <>
      <ViewContainer>
        <Section className="mt-24">
          <Headline size='x-large'>{'Archive'}</Headline>
        </Section>
      </ViewContainer>
    </>
  );
};

export default MainView;
