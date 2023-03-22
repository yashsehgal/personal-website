import ViewContainer from '@/components/layout/ViewContainer';
import ExperienceSection from '@/components/main/ExperienceSection';
import HeroSection from '@/components/main/HeroSection';
import ProjectSection from '@/components/main/ProjectSection';
import MetaHead from '@/components/seo/MetaHead';
import LinkText from '@/components/ui/LinkText';

const MainView: React.FunctionComponent = () => {
  return (
    <div className="main-view-container">
      <MetaHead />
      <ViewContainer className="grid grid-cols-1 items-start justify-start gap-12">
        <HeroSection />
        <ExperienceSection />
        <ProjectSection />
      </ViewContainer>
    </div>
  );
};

export default MainView;
