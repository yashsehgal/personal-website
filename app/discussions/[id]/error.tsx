'use client';

import { ViewContainer } from '@/components/layout/view-container';

export default function DiscussionError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="page__discussion-detail">
      <ViewContainer>
        <div className="text-center space-y-4">
          <h2 className="text-lg font-semibold">Something went wrong!</h2>
          <p className="text-gray-600">{error.message}</p>
          <button
            onClick={reset}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Try again
          </button>
        </div>
      </ViewContainer>
    </div>
  );
}
