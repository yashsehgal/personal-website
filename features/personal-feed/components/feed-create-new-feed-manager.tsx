"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useAuthSession } from "@/hooks/use-auth-session";
import { ReactElement } from "react";

interface FeedCreateNewFeedManagerProps {
  children: React.ReactNode;
}

export function FeedCreateNewFeedManager({
  children,
}: FeedCreateNewFeedManagerProps) {
  const { data: session } = useAuthSession();

  if (!session) return null;

  return (
    <Dialog>
      <DialogTrigger render={children as unknown as ReactElement} />
      <DialogContent></DialogContent>
    </Dialog>
  );
}
