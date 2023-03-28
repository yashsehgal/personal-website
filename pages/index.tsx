import ViewContainer from '@/components/layout/ViewContainer';
import ContactSection from '@/components/main/ContactSection';
import ExperienceSection from '@/components/main/ExperienceSection';
import Header from '@/components/main/Header';
import HeroSection from '@/components/main/HeroSection';
import ProjectSection from '@/components/main/ProjectSection';
import MetaHead from '@/components/seo/MetaHead';

const MainView: React.FunctionComponent = () => {
  return (
    <>
      <MetaHead />
      <div className="main-view-container">
        <ViewContainer className="grid grid-cols-1 items-start justify-start gap-12">
          <HeroSection />
          <ExperienceSection />
          <ProjectSection />
          <ContactSection />
        </ViewContainer>
      </div>
    </>
  );
};

export default MainView;
