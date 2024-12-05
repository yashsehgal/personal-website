import { ViewContainer } from '@/components/layout/view-container';
import { IconLoader2 } from '@tabler/icons-react';

export default function DiscussionLoading() {
  return (
    <div className="page__discussion-detail animate-pulse">
      <ViewContainer>
        <div className="p-4 text-gray-500 bg-gray-50 rounded text-sm flex items-center gap-2 border">
          <IconLoader2 size={16} className="animate-spin" />
          Loading discussions
        </div>
      </ViewContainer>
    </div>
  );
}
