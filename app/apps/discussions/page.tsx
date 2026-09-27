import { DiscussionsListLoader } from "@/components/discussions-list-loader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discussions",
};

export default function DiscussionsPage() {
  return (
    <div className="flex w-full min-w-0 flex-col items-start px-1 wide:mt-16">
      <DiscussionsListLoader />
    </div>
  );
}
