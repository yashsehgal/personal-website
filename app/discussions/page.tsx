'use client';
import { ViewContainer } from '@/components/layout/view-container';
import { getAllDiscussions } from '@/services/discussions';
import { useQuery } from '@tanstack/react-query';
import { DiscussionItem } from './_components/discussion-item';

export default function DiscussionsPage(): JSX.Element {
  const {
    data: response,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['discussions'],
    queryFn: getAllDiscussions,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  const renderDiscussionsList = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-8">
          <span className="loading-spinner">Loading discussions...</span>
        </div>
      );
    }

    if (error || response?.error) {
      return (
        <div className="error-message p-4 bg-red-50 text-red-600 rounded-md">
          Failed to load discussions. Please try again later.
        </div>
      );
    }

    if (!response?.discussions?.length) {
      return (
        <div className="empty-state p-4 text-gray-500 text-center">
          No discussions found. Be the first to start one!
        </div>
      );
    }

    return (
      <div className="discussions-list-wrapper grid gap-1">
        {response.discussions.map((discussion) => (
          <DiscussionItem key={discussion.id} {...discussion} />
        ))}
      </div>
    );
  };

  return (
    <div className="page__discussions">
      <ViewContainer>
        <div className="space-y-4">
          <h1 className="leading-snug text-xl font-semibold">/Discussions</h1>
          <p className="text-sm text-gray-500">
            An open discussion/chatting area. Share your views related to
            design, engineering, start a discussion about AI, travelling, art or
            music. Discussions are anonymous. Please keep things clean,
            readable. Do not share any personal info of your or others. Use it
            wisely.
          </p>
        </div>
        <div className="discussions-list-content-container my-12">
          {renderDiscussionsList()}
        </div>
      </ViewContainer>
    </div>
  );
}
