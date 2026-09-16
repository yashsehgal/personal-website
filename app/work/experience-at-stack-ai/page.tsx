import { StackAiExperienceBodySection } from "@/modules/work-page/stack-ai-experience-body-section";
import { StackAiExperienceClosingSection } from "@/modules/work-page/stack-ai-experience-closing-section";
import { StackAiExperienceHeaderSection } from "@/modules/work-page/stack-ai-experience-header-section";

export default function StackAiExperience() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mt-20 mb-18">
        <StackAiExperienceHeaderSection />
      </div>
      <div className="flex flex-col gap-6">
        <div className="h-px w-full bg-muted" />
        <StackAiExperienceBodySection />
        <div className="h-px w-full bg-muted" />
        <StackAiExperienceClosingSection />
      </div>
    </div>
  );
}
