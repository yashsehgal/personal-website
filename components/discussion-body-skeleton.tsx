export function DiscussionBodySkeleton() {
  return (
    <div className="flex w-full min-w-0 flex-col" role="status" aria-live="polite">
      <p className="sr-only">Loading discussion</p>
      <div aria-hidden="true" className="animate-pulse motion-reduce:animate-none">
        <div className="mt-20 h-6 w-56 max-w-full rounded-md bg-muted" />
        <div className="mt-10 flex w-full flex-col gap-3">
          <div className="h-20 w-full rounded-xl bg-muted" />
          <div className="h-20 w-full rounded-xl bg-muted" />
        </div>
      </div>
    </div>
  );
}
