import { DiscussionRowsSkeleton, DiscussionsList } from "@/components/discussions-list";

export default function DiscussionsLoading() {
  return (
    <div className="flex w-full min-w-0 flex-col items-start px-1 wide:mt-16">
      <DiscussionsList>
        <DiscussionRowsSkeleton />
      </DiscussionsList>
    </div>
  );
}
