"use client";

import { WEBSITE_ROUTES } from "@/common/routes";
import {
  CopyIconButton,
  copyIconButtonClassName,
} from "@/components/copy-icon-button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowLeft, Link2 } from "lucide-react";
import Link from "next/link";

export function ArticleTitle({
  title,
  backHref = WEBSITE_ROUTES.WRITINGS,
  backLabel = "Back to writings",
}: {
  title: string;
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <div className="flex w-full flex-col">
      <TooltipProvider>
        <div className="flex w-full items-center justify-between">
          <Tooltip>
            <TooltipTrigger
              render={
                <Link
                  href={backHref}
                  aria-label={backLabel}
                  className={copyIconButtonClassName}
                />
              }
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
            </TooltipTrigger>
            <TooltipContent>{backLabel}</TooltipContent>
          </Tooltip>
          <CopyIconButton
            label="Copy link"
            copiedLabel="Link copied"
            icon={Link2}
            getValue={() => window.location.href}
          />
        </div>
      </TooltipProvider>
      <h1 className="mt-20 text-pretty font-medium tracking-tight">{title}</h1>
    </div>
  );
}
