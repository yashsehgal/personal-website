"use client";

import {
  formatDiscussionDate,
  formatDiscussionDateTime,
} from "@/lib/discussions/dates";

export function LocalDate({
  iso,
  withTime = false,
  className,
}: {
  iso: string;
  withTime?: boolean;
  className?: string;
}) {
  const label = withTime
    ? formatDiscussionDateTime(iso)
    : formatDiscussionDate(iso);

  return (
    <time dateTime={iso} suppressHydrationWarning className={className}>
      {label}
    </time>
  );
}
