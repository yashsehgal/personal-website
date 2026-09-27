import { DiscussionsList } from "@/components/discussions-list";
import { listDiscussions } from "@/lib/discussions/queries";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Discussions",
};

export default async function DiscussionsPage() {
  const discussions = await listDiscussions();

  return (
    <div className="flex w-full min-w-0 flex-col items-start gap-6 px-1 wide:mt-16">
      <DiscussionsList discussions={discussions} />
    </div>
  );
}
