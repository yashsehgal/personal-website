"use client";

import { LocalDate } from "@/components/local-date";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WEBSITE_ROUTES } from "@/common/routes";
import { createDiscussionAction } from "@/lib/discussions/actions";
import {
  DISCUSSION_TITLE_MAX_LENGTH,
  formatReplyCount,
  type DiscussionSummary,
} from "@/lib/discussions/content";
import { cn } from "cn";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useRef, useState } from "react";

export function DiscussionsList({
  discussions,
}: {
  discussions: DiscussionSummary[];
}) {
  const router = useRouter();
  const titleId = useId();
  const errorId = useId();
  const titleInputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [optimisticDiscussion, setOptimisticDiscussion] =
    useState<DiscussionSummary | null>(null);

  const items = optimisticDiscussion
    ? [
        optimisticDiscussion,
        ...discussions.filter((discussion) => discussion.id !== optimisticDiscussion.id),
      ]
    : discussions;

  const startDiscussion = async () => {
    const nextTitle = title.trim();

    if (!nextTitle) {
      setError("Enter a title to start a discussion.");
      return;
    }

    setPending(true);
    setError(null);

    const result = await createDiscussionAction(nextTitle);

    if (!result.ok) {
      setPending(false);
      setError(result.error);
      return;
    }

    setOptimisticDiscussion(result.data);
    setOpen(false);
    setTitle("");
    setPending(false);
    router.push(`${WEBSITE_ROUTES.APPS_DISCUSSIONS}/${result.data.id}`);
  };

  return (
    <div className="flex w-full min-w-0 flex-col items-start gap-6">
      <div className="flex w-full min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-medium tracking-tight">Discussions</h1>
        <Dialog
          open={open}
          onOpenChange={(nextOpen) => {
            setOpen(nextOpen);
            if (!nextOpen) {
              setError(null);
              setTitle("");
            }
          }}
        >
          <DialogTrigger render={<Button />}>Start a new discussion</DialogTrigger>
          <DialogContent className="sm:max-w-md" initialFocus={titleInputRef}>
            <DialogHeader>
              <DialogTitle>Start a new discussion</DialogTitle>
              <DialogDescription>
                Add a title. Replies are anonymous.
              </DialogDescription>
            </DialogHeader>
            <form
              className="flex flex-col gap-3"
              onSubmit={(event) => {
                event.preventDefault();
                void startDiscussion();
              }}
            >
              <div className="flex flex-col gap-2">
                <Label htmlFor={titleId}>Title</Label>
                <Input
                  id={titleId}
                  ref={titleInputRef}
                  name="title"
                  value={title}
                  autoComplete="off"
                  maxLength={DISCUSSION_TITLE_MAX_LENGTH}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? errorId : undefined}
                  onChange={(event) => {
                    setTitle(event.target.value);
                    if (error) {
                      setError(null);
                    }
                  }}
                />
                {error ? (
                  <p id={errorId} role="alert" className="text-sm text-destructive">
                    {error}
                  </p>
                ) : null}
              </div>
              <DialogFooter>
                <DialogClose render={<Button type="button" variant="outline" />}>
                  Cancel
                </DialogClose>
                <Button type="submit" disabled={pending}>
                  Start discussion
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {items.length === 0 ? (
        <p className="text-sm tracking-tight text-muted-foreground">
          No discussions yet.
        </p>
      ) : (
        <ul className="-mx-1 flex w-[calc(100%+0.5rem)] min-w-0 flex-col">
          {items.map((discussion) => (
            <li key={discussion.id}>
              <Link
                href={`${WEBSITE_ROUTES.APPS_DISCUSSIONS}/${discussion.id}`}
                data-scrub-sound=""
                className={cn(
                  "flex flex-wrap items-baseline justify-between gap-x-6 gap-y-0.5 rounded px-1 py-0.5 text-sm tracking-tight text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:bg-muted focus-visible:text-foreground",
                  optimisticDiscussion?.id === discussion.id && "opacity-80",
                )}
              >
                <span className="min-w-0 text-pretty text-foreground">
                  {discussion.title}
                </span>
                <span className="flex shrink-0 items-baseline gap-3 tabular-nums">
                  <span>{formatReplyCount(discussion.replyCount)}</span>
                  <LocalDate iso={discussion.createdAt} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
