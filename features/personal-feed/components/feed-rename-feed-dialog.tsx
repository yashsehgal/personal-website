"use client";

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
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import type { IFeed } from "@/features/personal-feed/interfaces";
import { useUpdateFeed } from "@/hooks/use-update-feed";
import { Hash, Loader2 } from "lucide-react";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";

interface FeedRenameFeedDialogProps {
  feed: IFeed;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FeedRenameFeedDialog({
  feed,
  open,
  onOpenChange,
}: FeedRenameFeedDialogProps) {
  const updateFeed = useUpdateFeed();
  const [feedName, setFeedName] = useState("");

  useEffect(() => {
    if (open) setFeedName(feed.name);
    else setFeedName("");
  }, [open, feed.name]);

  const handleFeedNameChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setFeedName(event.target.value);
    },
    [],
  );

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const name = feedName.trim();
      if (!name || updateFeed.isPending || name === feed.name) {
        if (name === feed.name) onOpenChange(false);
        return;
      }
      updateFeed.mutate(
        { feedId: feed.id, patch: { name } },
        { onSuccess: () => onOpenChange(false) },
      );
    },
    [feed.id, feed.name, feedName, onOpenChange, updateFeed],
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Rename feed</DialogTitle>
            <DialogDescription>
              Choose a new name for this feed. It will be updated everywhere it
              appears.
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
  );
}
