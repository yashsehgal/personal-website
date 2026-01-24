import { IntegrationManager } from '@/app/posts/create-an-integration/components/integrations';

export default function PostCreateAnIntegrationPage() {
  return (
    <div className="p-6 space-y-8 h-full flex items-center justify-center">
      <div className="relative h-[420px] border w-md border-neutral-200 rounded-3xl">
        <IntegrationManager />
      </div>
    </div>
  );
}
