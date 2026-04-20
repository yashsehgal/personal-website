import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ReactElement } from "react";

interface FeedCreateNewFeedManagerProps {
  children: React.ReactNode;
}

export function FeedCreateNewFeedManager({
  children,
}: FeedCreateNewFeedManagerProps) {
  return (
    <Dialog>
      <DialogTrigger render={children as unknown as ReactElement} />
      <DialogContent></DialogContent>
    </Dialog>
  );
}
