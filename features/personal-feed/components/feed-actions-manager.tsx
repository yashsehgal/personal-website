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
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useManageFeedSessionQueryState } from "@/features/personal-feed/hooks/use-manage-feed-session-query-state";
import { IFeed } from "@/features/personal-feed/interfaces";
import { useAuthSession } from "@/hooks/use-auth-session";
import { useDeleteFeed } from "@/hooks/use-delete-feed";
import { useUpdateFeed } from "@/hooks/use-update-feed";
import { getYashMailtoHref } from "@/common/contact";
import { Archive, Bell, Hash, Loader2, Mail, Pencil } from "lucide-react";
import {
  ChangeEvent,
  FormEvent,
  ReactElement,
  useCallback,
  useState,
} from "react";

interface FeedActionsManagerProps {
  children: React.ReactNode;
  feed: IFeed;
}

export function FeedActionsManager({
  children,
  feed,
}: FeedActionsManagerProps) {
  const { data: session } = useAuthSession();
  const { feedSession, closeFeedSession } = useManageFeedSessionQueryState();
  const updateFeed = useUpdateFeed();
  const deleteFeedMutation = useDeleteFeed();

  const [renameOpen, setRenameOpen] = useState(false);
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [feedName, setFeedName] = useState("");

  const isFeedOwner = Boolean(
    session && feed.created_by_user_id === session.user.id,
  );

  const handleRenameOpenChange = useCallback(
    (next: boolean) => {
      setRenameOpen(next);
      if (next) setFeedName(feed.name);
      else setFeedName("");
    },
    [feed.name],
  );

  const handleFeedNameChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setFeedName(event.target.value);
    },
    [],
  );

  const handleRenameSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const name = feedName.trim();
      if (!name || updateFeed.isPending || name === feed.name) {
        if (name === feed.name) setRenameOpen(false);
        return;
      }
      updateFeed.mutate(
        { feedId: feed.id, patch: { name } },
        { onSuccess: () => setRenameOpen(false) },
      );
    },
    [feed.id, feed.name, feedName, updateFeed],
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
        <DropdownMenuContent className="w-80">
          <DropdownMenuItem
            onClick={() =>
              window.location.assign(
                getYashMailtoHref({
                  subject: "Reminder: check your inbox",
                }),
              )
            }
          >
            <Bell />
            Remind him to check his inbox
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => window.location.assign(getYashMailtoHref())}
          >
            <Mail />
            Reach out to Yash via email
          </DropdownMenuItem>
          {isFeedOwner ? (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleRenameOpenChange(true)}>
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

      <Dialog open={renameOpen} onOpenChange={handleRenameOpenChange}>
        <DialogContent>
          <form onSubmit={handleRenameSubmit}>
            <DialogHeader>
              <DialogTitle>Rename feed</DialogTitle>
              <DialogDescription>
                Choose a new name for this feed. It will be updated everywhere
                it appears.
              </DialogDescription>
            </DialogHeader>
            <div className="my-8">
              <div className="flex flex-col items-start gap-3">
                <Label htmlFor={`feed-rename-${feed.id}`}>Feed name</Label>
                <InputGroup>
                  <InputGroupInput
                    id={`feed-rename-${feed.id}`}
                    name="feedName"
                    placeholder="e.g. My first feed"
                    value={feedName}
                    onChange={handleFeedNameChange}
                    autoComplete="off"
                  />
                  <InputGroupAddon>
                    <Hash />
                  </InputGroupAddon>
                </InputGroup>
              </div>
            </div>
            <DialogFooter>
              <DialogClose
                render={
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                }
              />
              <Button
                type="submit"
                disabled={
                  !feedName.trim() ||
                  updateFeed.isPending ||
                  feedName.trim() === feed.name
                }
              >
                {updateFeed.isPending ? (
                  <Loader2 className="size-4 shrink-0" />
                ) : null}
                Save name
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

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
