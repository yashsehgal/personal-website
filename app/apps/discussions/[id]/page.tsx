import { ArticleToolbar } from "@/components/article-title";
import { DiscussionBodySkeleton } from "@/components/discussion-body-skeleton";
import { DiscussionThread } from "@/components/discussion-thread";
import { WEBSITE_ROUTES } from "@/common/routes";
import { isDiscussionId } from "@/lib/discussions/content";
import { getDiscussionThread } from "@/lib/discussions/queries";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

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

  if (!isDiscussionId(id)) {
    notFound();
  }

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-3xl flex-col items-start px-1 wide:mt-16">
      <ArticleToolbar
        backHref={WEBSITE_ROUTES.APPS_DISCUSSIONS}
        backLabel="Back to discussions"
      />
      <Suspense fallback={<DiscussionBodySkeleton />}>
        <DiscussionBody id={id} />
      </Suspense>
    </div>
  );
}

async function DiscussionBody({ id }: { id: string }) {
  const discussion = await getDiscussionThread(id);

  if (!discussion) {
    notFound();
  }

  return (
    <div className="flex w-full min-w-0 flex-col">
      <h1 className="mt-20 text-pretty font-medium tracking-tight">
        {discussion.title}
      </h1>
      <div className="mt-10 w-full min-w-0">
        <DiscussionThread
          discussionId={discussion.id}
          initialMessages={discussion.messages}
        />
      </div>
    </div>
  );
}
