import { HomeContactDetailsSection } from "@/modules/home-page/home-contact-details-section";
import { HomeIntroductionSection } from "@/modules/home-page/home-introduction-section";
import { HomeWorkExperienceListSection } from "@/modules/home-page/home-work-experience-list-section";

export default function Home() {
  return (
    <div>
      <div className="mt-20 mb-18">
        <HomeIntroductionSection />
      </div>
      <div>
        <HomeWorkExperienceListSection />
      </div>
      <div className="mt-28">
        <HomeContactDetailsSection />
      </div>
    </div>
  );
}
