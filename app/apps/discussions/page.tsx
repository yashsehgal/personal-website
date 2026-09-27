import { DiscussionRows, DiscussionsList } from "@/components/discussions-list";
import { listDiscussions } from "@/lib/discussions/queries";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Discussions",
};

export default function DiscussionsPage() {
  return (
    <div className="flex w-full min-w-0 flex-col items-start px-1 wide:mt-16">
      <DiscussionsList>
        <DiscussionsLoader />
      </DiscussionsList>
    </div>
  );
}

async function DiscussionsLoader() {
  const discussions = await listDiscussions();
  return <DiscussionRows discussions={discussions} />;
}
