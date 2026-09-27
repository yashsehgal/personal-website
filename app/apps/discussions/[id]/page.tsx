import { ArticleToolbar } from "@/components/article-title";
import { DiscussionViewLoader } from "@/components/discussion-view-loader";
import { WEBSITE_ROUTES } from "@/common/routes";
import { isDiscussionId } from "@/lib/discussions/content";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Discussion",
};

export default async function DiscussionPage({
  params,
}: PageProps<"/apps/discussions/[id]">) {
  const { id } = await params;

  if (!isDiscussionId(id)) {
    notFound();
  }

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-3xl flex-col items-start px-1 wide:mt-16">
      <ArticleToolbar
        backHref={WEBSITE_ROUTES.APPS_DISCUSSIONS}
        backLabel="Back to discussions"
      />
      <DiscussionViewLoader id={id} />
    </div>
  );
}
