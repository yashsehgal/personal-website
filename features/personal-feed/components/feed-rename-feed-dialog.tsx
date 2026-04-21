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
import {
  formatFeedNameInput,
  handleFeedNameInputChange,
} from "@/features/personal-feed/utils/format-feed-name-input";
import { useUpdateFeed } from "@/hooks/use-update-feed";
import { Hash, Loader2 } from "lucide-react";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";

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
  const [feedName, setFeedName] = useState(() =>
    formatFeedNameInput(feed.name),
  );

  const handleFeedNameChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      handleFeedNameInputChange(event, setFeedName);
    },
    [],
  );

  const normalizedFeedName = formatFeedNameInput(feed.name);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const name = feedName.trim();
      if (!name || updateFeed.isPending || name === normalizedFeedName) {
        if (name === normalizedFeedName) onOpenChange(false);
        return;
      }
      updateFeed.mutate(
        { feedId: feed.id, patch: { name } },
        { onSuccess: () => onOpenChange(false) },
      );
    },
    [feed.id, feedName, normalizedFeedName, onOpenChange, updateFeed],
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
                feedName.trim() === normalizedFeedName
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
