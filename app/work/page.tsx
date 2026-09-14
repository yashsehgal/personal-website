import { WorkExperienceSummarySection } from "@/modules/work-page/work-experience-summary-section";
import { WorkHeaderSection } from "@/modules/work-page/work-header-section";

export default function Work() {
  return (
    <div>
      <div className="mt-20 mb-18">
        <WorkHeaderSection />
      </div>
      <div>
        <WorkExperienceSummarySection />
      </div>
    </div>
  );
}
