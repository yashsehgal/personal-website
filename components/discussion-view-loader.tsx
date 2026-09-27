"use client";

import { DiscussionBodySkeleton } from "@/components/discussion-body-skeleton";
import dynamic from "next/dynamic";

const DiscussionView = dynamic(
  () => import("@/components/discussion-view").then((mod) => mod.DiscussionView),
  {
    ssr: false,
    loading: () => <DiscussionBodySkeleton />,
  },
);

export function DiscussionViewLoader({ id }: { id: string }) {
  return <DiscussionView id={id} />;
}
