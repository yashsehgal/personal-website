'use client';

import { ViewContainer } from '@/components/layout/view-container';
import { getDiscussion, getDiscussionContent } from '@/services/discussions';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { CommentItem } from '../_components/comment-item';
import { IconInfoCircle, IconLoader2 } from '@tabler/icons-react';
import React from 'react';

export default function DiscussionPage(): JSX.Element {
  const params = useParams();
  const discussionId = parseInt(params.id as string, 10);

  // Validate discussionId
  if (isNaN(discussionId)) {
    return (
      <ViewContainer>
        <div className="text-center py-8">
          <h1 className="text-xl font-semibold">Invalid Discussion ID</h1>
          <Link
            href="/discussions"
            className="w-fit text-xs font-medium text-black px-2 py-1">
            back to /discussions
          </Link>
        </div>
      </ViewContainer>
    );
  }

  const {
    data: discussionResponse,
    error: discussionError,
    isLoading: isLoadingDiscussion,
  } = useQuery({
    queryKey: ['discussion', discussionId],
    queryFn: () => getDiscussion(discussionId),
    staleTime: 1000 * 60 * 5,
    retry: 2,
    enabled: !isNaN(discussionId),
  });

  const {
    data: messagesResponse,
    error: messagesError,
    isLoading: isLoadingMessages,
  } = useQuery({
    queryKey: ['discussion-content', discussionId],
    queryFn: () => getDiscussionContent(discussionId),
    staleTime: 1000 * 60 * 1,
    retry: 2,
    enabled: !isNaN(discussionId),
  });

  const renderContent = () => {
    if (isLoadingMessages) {
      return (
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-500">Loading messages...</div>
        </div>
      );
    }

    if (messagesError || messagesResponse?.error) {
      return (
        <div className="p-4 bg-red-50 text-red-600 rounded-md">
          An error occurred while loading the discussion. Please try again
          later.
        </div>
      );
    }

    if (!messagesResponse?.messages?.length) {
      return (
        <div className="p-4 text-gray-500 bg-gray-50 rounded text-sm flex items-center gap-2 border">
          <IconInfoCircle size={16} />
          No messages in this discussion yet. Be the first to comment!
        </div>
      );
    }

    return (
      <div className="discussions-thread-container">
        {messagesResponse.messages.map((message, index) => (
          <React.Fragment key={index}>
            {index !== 0 && (
              <div className="w-[1px] h-[40px] bg-gray-200 ml-12" />
            )}
            <CommentItem key={message.id} {...message} />
          </React.Fragment>
        ))}
      </div>
    );
  };

  if (isLoadingDiscussion) {
    return (
      <ViewContainer>
        <div className="p-4 text-gray-500 bg-gray-50 rounded text-sm flex items-center gap-2 border">
          <IconLoader2 size={16} className="animate-spin" />
          Loading discussions
        </div>
      </ViewContainer>
    );
  }

  if (
    discussionError ||
    discussionResponse?.error ||
    !discussionResponse?.discussion
  ) {
    return (
      <ViewContainer>
        <div className="py-8">
          <div className="p-4 bg-red-50 text-red-600 rounded-md">
            Discussion not found or an error occurred.
          </div>
          <Link
            href="/discussions"
            className="w-fit text-xs font-medium text-black px-2 py-1">
            back to /discussions
          </Link>
        </div>
      </ViewContainer>
    );
  }

  return (
    <div className="min-h-screen">
      <ViewContainer>
        <div className="space-y-6">
          <div className="flex flex-col space-y-4">
            <Link
              href="/discussions"
              className="w-fit fixed top-6 left-6 text-xs font-medium text-black px-2 py-1">
              back to /discussions
            </Link>
            <h1 className="text-xl font-semibold">
              {discussionResponse.discussion.title}
            </h1>
          </div>
          <div className="discussion-content">{renderContent()}</div>
        </div>
      </ViewContainer>
    </div>
  );
}
