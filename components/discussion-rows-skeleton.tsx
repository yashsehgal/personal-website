import { Loader2 } from "lucide-react";

const discussionListClassName =
  "-mx-1 flex w-[calc(100%+0.5rem)] min-w-0 flex-col";

export function PendingDiscussionRow({ title }: { title: string }) {
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

export function DiscussionRowsSkeleton({
  pendingTitle = null,
}: {
  pendingTitle?: string | null;
}) {
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
          className="flex w-full min-w-0 flex-col gap-1.5 animate-pulse motion-reduce:animate-none"
        >
          {Array.from({ length: 5 }, (_, index) => (
            <li key={index} className="h-5 w-full rounded-md bg-muted" />
          ))}
        </ul>
      </div>
    </div>
  );
}
