import ViewContainer from "@/components/layout/ViewContainer";
import HeroSection from "@/components/main/HeroSection";
import LinkText from "@/components/ui/LinkText";


const MainView: React.FunctionComponent = () => {
  return (
    <div className="main-view-container">
      <ViewContainer>
        <HeroSection />
      </ViewContainer>
    </div>
  )
};

export default MainView;