import { ViewContainer } from '@/components/layout/view-container';
import Header from '@/components/sections/header';
import Projects from '@/components/sections/projects';
import Work from '@/components/sections/work';
import Writings from '@/components/sections/writings';

export default function Home() {
  return (
    <main className="home-page">
      <ViewContainer className="space-y-8">
        <Header />
        <Projects />
        <Work />
        <Writings />
      </ViewContainer>
    </main>
  );
}
