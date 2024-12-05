'use client';

import { ViewContainer } from '@/components/layout/view-container';
import {
  createMessage,
  getDiscussion,
  getDiscussionContent,
} from '@/services/discussions';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { CommentItem } from '../_components/comment-item';
import { IconInfoCircle, IconLoader2, IconSend } from '@tabler/icons-react';
import React, { useState } from 'react';
import { AutoResizeTextarea } from '@/components/ui/auto-resize-textarea';

export default function DiscussionPage(): JSX.Element {
  const params = useParams();
  const discussionId = parseInt(params.id as string, 10);
  const queryClient = useQueryClient();
  const [newMessage, setNewMessage] = useState('');

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

  const createMessageMutation = useMutation({
    mutationFn: createMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['discussion-content', discussionId],
      });
      setNewMessage('');
    },
  });

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

  const handleCreateMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const content = newMessage.trim();
    if (!content || createMessageMutation.isPending) return;

    createMessageMutation.mutate({
      discussion_id: discussionId,
      content,
    });
  };

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

    return (
      <div className="space-y-6 mb-56">
        {!messagesResponse?.messages?.length ? (
          <div className="p-4 text-gray-500 bg-gray-50 rounded text-sm flex items-center gap-2 border">
            <IconInfoCircle size={16} />
            No messages in this discussion yet. Be the first to comment!
          </div>
        ) : (
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
        )}

        {createMessageMutation.isError && (
          <div className="p-4 text-gray-500 bg-red-50 rounded text-sm flex items-center gap-2 border text-red-600">
            <IconInfoCircle size={16} />
            Failed to send message. Please try again.
          </div>
        )}

        <form onSubmit={handleCreateMessage} className="mt-12 bg-white">
          <div className="flex items-center gap-2 p-2 border rounded-md bg-white">
            <AutoResizeTextarea
              placeholder="Type your message..."
              className="flex-1 text-sm px-2 py-1.5 focus:outline-none max-h-[200px]"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              disabled={createMessageMutation.isPending}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.shiftKey) {
                  e.preventDefault();
                  handleCreateMessage(e);
                }
              }}
            />
            <button
              type="submit"
              disabled={createMessageMutation.isPending || !newMessage.trim()}
              className="text-xs text-gray-500 flex gap-2 items-center hover:bg-gray-100 px-1.5 py-0.5 rounded-md active:bg-gray-200 disabled:opacity-50">
              <IconSend size={14} />
            </button>
          </div>
          <div className="support-text text-xs mt-2 flex items-center justify-end">
            Press shift + enter to send
          </div>
        </form>
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
