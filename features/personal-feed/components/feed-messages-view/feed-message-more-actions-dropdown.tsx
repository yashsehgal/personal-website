"use client";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { IFeedMessage } from "@/features/personal-feed/interfaces";
import { useAuthSession } from "@/hooks/use-auth-session";
import { useDeleteFeedMessage } from "@/hooks/use-delete-feed-message";
import {
  Bookmark,
  Copy,
  CornerDownRight,
  Ellipsis,
  TextQuote,
  Trash,
} from "lucide-react";
import { useMemo, useState } from "react";

interface FeedMessageMoreActionsDropdownProps {
  message: IFeedMessage;
  onReplyInThread: () => void;
}

export function FeedMessageMoreActionsDropdown({
  message,
  onReplyInThread,
}: FeedMessageMoreActionsDropdownProps) {
  const { data: session } = useAuthSession();
  const deleteFeedMessage = useDeleteFeedMessage();
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const canDeleteMessage = useMemo(() => {
    const authenticatedUserId = session?.user?.id;
    if (!authenticatedUserId) return false;
    if (!message.user_id) return false;
    return authenticatedUserId === message.user_id;
  }, [session?.user?.id, message.user_id]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              type="button"
              size="icon-xs"
              variant="ghost"
              aria-label="More options"
            >
              <Ellipsis />
            </Button>
          }
        />
        <DropdownMenuContent className="w-72">
          <DropdownMenuItem
            onClick={() => {
              void navigator.clipboard.writeText(message.content);
            }}
          >
            <Copy />
            Copy message
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onReplyInThread}>
            <CornerDownRight />
            Reply in thread
          </DropdownMenuItem>
          {canDeleteMessage ? (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                disabled={deleteFeedMessage.isPending}
                onClick={() => {
                  setIsDeleteConfirmOpen(true);
                }}
              >
                <Trash />
                Delete this message...
              </DropdownMenuItem>
            </>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog
        open={isDeleteConfirmOpen}
        onOpenChange={setIsDeleteConfirmOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this message?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this message? This cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="p-3 rounded-lg text-xs leading-6 border border-border">
            <pre className="whitespace-pre-wrap font-sans">
              {message.content}
            </pre>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteFeedMessage.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={deleteFeedMessage.isPending}
              onClick={() => {
                deleteFeedMessage.mutate(
                  {
                    messageId: message.id,
                    feedId: message.feed_id,
                  },
                  {
                    onSuccess: () => {
                      setIsDeleteConfirmOpen(false);
                    },
                  },
                );
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
