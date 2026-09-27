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
  normalizeDiscussionTitle,
  type DiscussionSummary,
} from "@/lib/discussions/content";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  createContext,
  Suspense,
  useContext,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";

const PendingDiscussionContext = createContext<string | null>(null);

const discussionListClassName =
  "-mx-1 flex w-[calc(100%+0.5rem)] min-w-0 flex-col";

function PendingDiscussionRow({ title }: { title: string }) {
  return (
    <div
      aria-disabled="true"
      aria-busy="true"
      className="pointer-events-none rounded px-1 py-0.5 text-sm tracking-tight text-muted-foreground"
    >
      <span className="text-pretty">{title}</span>
      <Loader2
        aria-hidden="true"
        className="ml-2 inline size-3.5 shrink-0 animate-spin align-[-0.125em] motion-reduce:animate-none"
      />
      <span className="sr-only">Creating discussion</span>
    </div>
  );
}

export function DiscussionRowsSkeleton() {
  const pendingTitle = useContext(PendingDiscussionContext);

  return (
    <div className="flex w-full min-w-0 flex-col">
      {pendingTitle ? (
        <ul className={discussionListClassName}>
          <li>
            <PendingDiscussionRow title={pendingTitle} />
          </li>
        </ul>
      ) : null}
      <div role="status" aria-live="polite">
        <p className="sr-only">Loading discussions</p>
        <ul
          aria-hidden="true"
          className={`${discussionListClassName} animate-pulse motion-reduce:animate-none`}
        >
          {Array.from({ length: 3 }, (_, index) => (
            <li
              key={index}
              className="flex items-center justify-between gap-6 px-1 py-0.5"
            >
              <div className="h-5 w-48 max-w-[60%] rounded-md bg-muted" />
              <div className="h-5 w-28 shrink-0 rounded-md bg-muted" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function DiscussionRows({
  discussions,
}: {
  discussions: DiscussionSummary[];
}) {
  const pendingTitle = useContext(PendingDiscussionContext);

  if (discussions.length === 0 && !pendingTitle) {
    return (
      <p className="text-sm tracking-tight text-muted-foreground">
        No discussions yet.
      </p>
    );
  }

  return (
    <ul className={discussionListClassName}>
      {pendingTitle ? (
        <li>
          <PendingDiscussionRow title={pendingTitle} />
        </li>
      ) : null}
      {discussions.map((discussion) => (
        <li key={discussion.id}>
          <Link
            href={`${WEBSITE_ROUTES.APPS_DISCUSSIONS}/${discussion.id}`}
            data-scrub-sound=""
            className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-0.5 rounded px-1 py-0.5 text-sm tracking-tight text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:bg-muted focus-visible:text-foreground"
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
  );
}

export function DiscussionsList({ children }: { children: ReactNode }) {
  const router = useRouter();
  const titleId = useId();
  const errorId = useId();
  const titleInputRef = useRef<HTMLInputElement>(null);
  const creatingRef = useRef(false);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pendingTitle, setPendingTitle] = useState<string | null>(null);

  const startDiscussion = async () => {
    const nextTitle = normalizeDiscussionTitle(title);

    if (!nextTitle) {
      setError("Enter a title to start a discussion.");
      return;
    }

    if (creatingRef.current) {
      return;
    }

    creatingRef.current = true;
    setPendingTitle(nextTitle);
    setError(null);
    setTitle("");
    setOpen(false);

    const result = await createDiscussionAction(nextTitle);
    creatingRef.current = false;

    if (!result.ok) {
      setPendingTitle(null);
      setTitle(nextTitle);
      setError(result.error);
      setOpen(true);
      return;
    }

    router.push(`${WEBSITE_ROUTES.APPS_DISCUSSIONS}/${result.data.id}`);
  };

  return (
    <PendingDiscussionContext.Provider value={pendingTitle}>
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
            <DialogTrigger
              render={<Button disabled={pendingTitle !== null} />}
            >
              Start a new discussion
            </DialogTrigger>
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
                  <Button type="submit" disabled={pendingTitle !== null}>
                    Start discussion
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <Suspense fallback={<DiscussionRowsSkeleton />}>{children}</Suspense>
      </div>
    </PendingDiscussionContext.Provider>
  );
}
