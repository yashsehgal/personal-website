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
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { useManageFeedSessionQueryState } from "@/features/personal-feed/hooks/use-manage-feed-session-query-state";
import { useAuthSession } from "@/hooks/use-auth-session";
import { useCreateFeed } from "@/hooks/use-create-feed";
import { Hash, Loader2 } from "lucide-react";
import {
  ChangeEvent,
  FormEvent,
  ReactElement,
  useCallback,
  useState,
} from "react";

interface FeedCreateNewFeedManagerProps {
  children: React.ReactNode;
}

export function FeedCreateNewFeedManager({
  children,
}: FeedCreateNewFeedManagerProps) {
  const { data: session } = useAuthSession();
  const { openFeedSession } = useManageFeedSessionQueryState();
  const createFeed = useCreateFeed();

  const [open, setOpen] = useState(false);
  const [feedName, setFeedName] = useState("");

  const handleOpenChange = useCallback((next: boolean) => {
    setOpen(next);
    if (!next) setFeedName("");
  }, []);

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
      if (!name || createFeed.isPending) return;
      createFeed.mutate(
        { name, is_public: false },
        {
          onSuccess: (feed) => {
            openFeedSession(feed.id);
            setOpen(false);
            setFeedName("");
          },
        },
      );
    },
    [createFeed, feedName, openFeedSession],
  );

  if (!session) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={children as unknown as ReactElement} />
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create a new feed</DialogTitle>
            <DialogDescription>
              You can create a new feed to start a new private conversation. As
              you&apos;re authenticated, these feeds are going to be saved for
              you.
            </DialogDescription>
          </DialogHeader>
          <div className="my-8">
            <div className="flex flex-col items-start gap-3">
              <Label htmlFor="feed-name">Enter a feed name</Label>
              <InputGroup>
                <InputGroupInput
                  id="feed-name"
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
              disabled={!feedName.trim() || createFeed.isPending}
            >
              {createFeed.isPending ? (
                <Loader2 className="size-4 shrink-0" />
              ) : null}
              Create new feed
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
