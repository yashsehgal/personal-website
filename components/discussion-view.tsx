"use client";

import { DiscussionBodySkeleton } from "@/components/discussion-body-skeleton";
import { DiscussionThread } from "@/components/discussion-thread";
import {
  DiscussionNotFoundError,
  useDiscussionThread,
} from "@/lib/discussions/hooks";
import { notFound } from "next/navigation";
import { useEffect } from "react";

export function DiscussionView({ id }: { id: string }) {
  const thread = useDiscussionThread(id);

  useEffect(() => {
    if (!thread.isSuccess) {
      return;
    }

    document.title = `Yash Sehgal - ${thread.data.title}`;
  }, [thread.data?.title, thread.isSuccess]);

  if (thread.isLoading) {
    return <DiscussionBodySkeleton />;
  }

  if (thread.isError && thread.error instanceof DiscussionNotFoundError) {
    notFound();
  }

  if (thread.isError) {
    return (
      <p className="mt-20 text-sm tracking-tight text-muted-foreground">
        Unable to load this discussion.
      </p>
    );
  }

  if (!thread.isSuccess) {
    return <DiscussionBodySkeleton />;
  }

  return (
    <div className="flex w-full min-w-0 flex-col">
      <h1 className="mt-20 text-pretty font-medium tracking-tight">
        {thread.data.title}
      </h1>
      <div className="mt-10 w-full min-w-0">
        <DiscussionThread discussionId={id} />
      </div>
    </div>
  );
}
