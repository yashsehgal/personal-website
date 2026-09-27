import { ArticleTitle } from "@/components/article-title";
import { DiscussionThread } from "@/components/discussion-thread";
import { WEBSITE_ROUTES } from "@/common/routes";
import { getDiscussionThread } from "@/lib/discussions/queries";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps<"/apps/discussions/[id]">): Promise<Metadata> {
  const { id } = await params;
  const discussion = await getDiscussionThread(id);

  if (!discussion) {
    return { title: "Discussion" };
  }

  return { title: discussion.title };
}

export default async function DiscussionPage({
  params,
}: PageProps<"/apps/discussions/[id]">) {
  const { id } = await params;
  const discussion = await getDiscussionThread(id);

  if (!discussion) {
    notFound();
  }

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-3xl flex-col items-start gap-10 px-1 wide:mt-16">
      <ArticleTitle
        title={discussion.title}
        backHref={WEBSITE_ROUTES.APPS_DISCUSSIONS}
        backLabel="Back to discussions"
      />
      <DiscussionThread
        discussionId={discussion.id}
        initialMessages={discussion.messages}
      />
    </div>
  );
}
