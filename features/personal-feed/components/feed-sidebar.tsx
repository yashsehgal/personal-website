"use client";
import { useFeeds } from "@/hooks/use-feeds";

export function FeedSidebar() {
  const { data, isLoading } = useFeeds();

  return <aside className="w-1/5 p-2"></aside>;
}
