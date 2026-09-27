"use client";

import { DiscussionRowsSkeleton } from "@/components/discussion-rows-skeleton";
import dynamic from "next/dynamic";

function DiscussionsListFallback() {
  return (
    <div className="flex w-full min-w-0 flex-col items-start gap-6">
      <div className="flex w-full min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-medium tracking-tight">Discussions</h1>
        <span className="inline-flex h-8 items-center rounded-lg bg-muted px-2.5 text-sm font-medium text-transparent select-none">
          Start a new discussion
        </span>
      </div>
      <DiscussionRowsSkeleton />
    </div>
  );
}

const DiscussionsList = dynamic(
  () =>
    import("@/components/discussions-list").then((mod) => mod.DiscussionsList),
  {
    ssr: false,
    loading: () => <DiscussionsListFallback />,
  },
);

export function DiscussionsListLoader() {
  return <DiscussionsList />;
}
