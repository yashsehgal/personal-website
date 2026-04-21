"use client";

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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FeedRenameFeedDialog } from "@/features/personal-feed/components/feed-rename-feed-dialog";
import { useManageFeedSessionQueryState } from "@/features/personal-feed/hooks/use-manage-feed-session-query-state";
import { IFeed } from "@/features/personal-feed/interfaces";
import { useAuthSession } from "@/hooks/use-auth-session";
import { useDeleteFeed } from "@/hooks/use-delete-feed";
import { getYashMailtoHref } from "@/common/contact";
import { Archive, Loader2, Mail, Pencil } from "lucide-react";
import { ReactElement, useCallback, useState } from "react";

interface FeedActionsManagerProps {
  children: React.ReactNode;
  feed: IFeed;
  withoutTooltip?: boolean;
}

export function FeedActionsManager({
  children,
  feed,
  withoutTooltip = false,
}: FeedActionsManagerProps) {
  const { data: session } = useAuthSession();
  const { feedSession, closeFeedSession } = useManageFeedSessionQueryState();
  const deleteFeedMutation = useDeleteFeed();

  const [renameOpen, setRenameOpen] = useState(false);
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);

  const isFeedOwner = Boolean(
    session && feed.created_by_user_id === session.user.id,
  );

  const handleConfirmDelete = useCallback(() => {
    if (deleteFeedMutation.isPending) return;
    deleteFeedMutation.mutate(feed.id, {
      onSuccess: () => {
        if (feedSession === feed.id) closeFeedSession();
        setDeleteAlertOpen(false);
      },
    });
  }, [closeFeedSession, deleteFeedMutation, feed.id, feedSession]);

  if (!session) return null;

  return (
    <>
      <DropdownMenu>
        {withoutTooltip ? (
          <DropdownMenuTrigger render={children as unknown as ReactElement} />
        ) : (
          <Tooltip>
            <TooltipTrigger
              render={
                <DropdownMenuTrigger
                  render={children as unknown as ReactElement}
                />
              }
            />
            <TooltipContent>More options...</TooltipContent>
          </Tooltip>
        )}
        <DropdownMenuContent className="w-80">
          <DropdownMenuItem
            onClick={() => window.location.assign(getYashMailtoHref())}
          >
            <Mail />
            Reach out to Yash via email
          </DropdownMenuItem>
          {isFeedOwner ? (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setRenameOpen(true)}>
                <Pencil />
                Rename...
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                onClick={() => setDeleteAlertOpen(true)}
              >
                <Archive />
                Delete this feed...
              </DropdownMenuItem>
            </>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>

      <FeedRenameFeedDialog
        feed={feed}
        open={renameOpen}
        onOpenChange={setRenameOpen}
      />

      <AlertDialog open={deleteAlertOpen} onOpenChange={setDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this feed?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete &quot;{feed.name}&quot; and all of
              its messages. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={deleteFeedMutation.isPending}
              onClick={handleConfirmDelete}
            >
              {deleteFeedMutation.isPending ? (
                <Loader2 className="size-4 shrink-0" />
              ) : null}
              Delete feed
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
