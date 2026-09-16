import { AboutHeaderSection } from "@/modules/about-page/about-header-section";
import { AboutIntroductionSection } from "@/modules/about-page/about-introduction-section";

export default function About() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="mt-20 mb-18">
        <AboutHeaderSection />
      </div>
      <div className="flex flex-col gap-6">
        <AboutIntroductionSection />
      </div>
    </div>
  );
}
