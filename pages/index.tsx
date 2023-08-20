import ViewContainer from './components/layouts/view-container';
import Headline from './components/ui/headline';

const MainView: React.FunctionComponent = () => {
  return (
    <>
      <ViewContainer>
        <Headline size='x-large'>{'Archive'}</Headline>
      </ViewContainer>
    </>
  );
};

export default MainView;
