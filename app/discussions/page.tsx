'use client';
import { ViewContainer } from '@/components/layout/view-container';
import { createDiscussion, getAllDiscussions } from '@/services/discussions';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DiscussionItem } from './_components/discussion-item';
import {
  IconInfoTriangle,
  IconLoader2,
  IconPlus,
  IconSparkles,
} from '@tabler/icons-react';
import { useState } from 'react';
import Link from 'next/link';

export default function DiscussionsPage(): JSX.Element {
  const [showNewDiscussionForm, setShowNewDiscussionForm] =
    useState<boolean>(false);
  const [newDiscussionInput, setNewDiscussionInput] =
    useState<string>('New discussion');
  const queryClient = useQueryClient();

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

  const createDiscussionMutation = useMutation({
    mutationFn: createDiscussion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discussions'] });
      setShowNewDiscussionForm(false);
      setNewDiscussionInput('New discussion');
    },
  });

  const handleCreateDiscussion = () => {
    const title = newDiscussionInput.trim();
    if (!title) return;

    createDiscussionMutation.mutate({ title });
  };

  const renderDiscussionsList = () => {
    if (isLoading) {
      return (
        <div className="p-4 text-gray-500 bg-gray-50 rounded text-sm flex items-center gap-2 border">
          <IconLoader2 size={16} className="animate-spin" />
          Loading all discussions
        </div>
      );
    }

    if (error || response?.error) {
      return (
        <div className="error-message p-4 bg-red-50 text-red-600 rounded-md">
          <IconInfoTriangle size={16} />
          Failed to load discussions. Please try again later.
        </div>
      );
    }

    if (!response?.discussions?.length) {
      return (
        <div className="p-4 text-gray-500 bg-gray-50 rounded text-sm flex items-center gap-2 border">
          <IconSparkles size={16} className="animate-spin" />
          Not discussions found! Be the first one to start
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
          <h1 className="leading-snug text-xl font-semibold">
            <Link href="/">Yash Sehgal</Link>
            /Discussions
          </h1>
          <p className="text-sm text-gray-500">
            An open discussion/chatting area. Share your views related to
            design, engineering, start a discussion about AI, travelling, art or
            music. Discussions are anonymous. Please keep things clean,
            readable. Do not share any personal info of your or others. Use it
            wisely.
          </p>
        </div>
        <div className="discussions-list-content-container my-12">
          {showNewDiscussionForm ? (
            <div className="create-new-discussion-form-container flex items-center justify-between p-2 border rounded-md mb-12 gap-12">
              <input
                type="text"
                placeholder="Title of the discussion"
                className="text-sm font-medium px-2 py-1 w-full border rounded"
                value={newDiscussionInput}
                onChange={(e) => setNewDiscussionInput(e.target.value)}
                onFocus={(e) => e.target.select()}
                onBlur={(e) => {
                  if (!e.target.value.trim().length) {
                    setShowNewDiscussionForm(false);
                  }
                }}
                disabled={createDiscussionMutation.isPending}
                autoFocus
              />
              <div className="flex items-center gap-2">
                <button
                  className="text-sm text-gray-500 flex gap-2 items-center border hover:bg-gray-100 px-1.5 py-0.5 rounded-md w-fit ml-auto active:bg-gray-200 disabled:opacity-50"
                  onClick={() => {
                    setShowNewDiscussionForm(false);
                    setNewDiscussionInput('New discussion');
                  }}
                  disabled={createDiscussionMutation.isPending}>
                  cancel
                </button>
                <button
                  className="text-sm text-white flex gap-2 items-center bg-indigo-600 border hover:bg-indigo-700 px-1.5 py-0.5 rounded-md w-fit ml-auto active:bg-indigo-800 disabled:opacity-50"
                  onClick={handleCreateDiscussion}
                  disabled={createDiscussionMutation.isPending}>
                  {createDiscussionMutation.isPending
                    ? 'creating...'
                    : 'create'}
                </button>
              </div>
            </div>
          ) : (
            <button
              className="mb-4 text-sm text-gray-500 flex gap-2 items-center hover:bg-gray-100 px-1.5 py-0.5 rounded-md w-fit ml-auto active:bg-gray-200"
              onClick={() => setShowNewDiscussionForm(true)}>
              <IconPlus size={14} />
              Start a new discussion
            </button>
          )}
          {createDiscussionMutation.isError && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
              Failed to create discussion. Please try again.
            </div>
          )}
          {renderDiscussionsList()}
        </div>
      </ViewContainer>
    </div>
  );
}
