import { WEBSITE_ROUTES } from "@/common/routes";
import Link from "next/link";

export default function DiscussionNotFound() {
  return (
    <div className="mx-auto flex w-full min-w-0 max-w-3xl flex-col items-start gap-6 px-1 wide:mt-16">
      <h1 className="font-medium tracking-tight">Discussion not found</h1>
      <p className="tracking-tight text-pretty text-muted-foreground">
        This discussion does not exist.
      </p>
      <Link
        href={WEBSITE_ROUTES.APPS_DISCUSSIONS}
        className="rounded px-1 py-0.5 text-sm font-medium tracking-tight text-foreground hover:bg-muted focus-visible:bg-muted"
      >
        Back to discussions
      </Link>
    </div>
  );
}
