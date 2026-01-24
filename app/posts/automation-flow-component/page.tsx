import { AutomationFlow } from '@/app/posts/automation-flow-component/components/automation-flow';

export default function PostAutomationFlowComponentPage() {
  return (
    <div className="p-6 space-y-8 h-full flex items-center justify-center">
      <div className="w-fit mx-auto max-lg:scale-90">
        <AutomationFlow />
      </div>
    </div>
  );
}
