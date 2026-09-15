import { WorkExperienceCompaniesSection } from "@/modules/work-page/work-experience-companies-section";
import { WorkExperienceSummarySection } from "@/modules/work-page/work-experience-summary-section";
import { WorkHeaderSection } from "@/modules/work-page/work-header-section";

export default function Work() {
  return (
    <div>
      <div className="mt-20 mb-18">
        <WorkHeaderSection />
      </div>
      <div className="flex flex-col gap-12">
        <div className="h-px w-full bg-muted" />
        <WorkExperienceCompaniesSection />
        <div className="h-px w-full bg-muted" />
        <WorkExperienceSummarySection />
      </div>
    </div>
  );
}
