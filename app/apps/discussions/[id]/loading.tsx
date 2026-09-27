import { ArticleToolbar } from "@/components/article-title";
import { DiscussionBodySkeleton } from "@/components/discussion-body-skeleton";
import { WEBSITE_ROUTES } from "@/common/routes";

export default function DiscussionLoading() {
  return (
    <div className="mx-auto flex w-full min-w-0 max-w-3xl flex-col items-start px-1 wide:mt-16">
      <ArticleToolbar
        backHref={WEBSITE_ROUTES.APPS_DISCUSSIONS}
        backLabel="Back to discussions"
      />
      <DiscussionBodySkeleton />
    </div>
  );
}
