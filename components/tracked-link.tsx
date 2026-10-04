"use client";

import { track } from "@/lib/analytics/client";
import type {
  AnalyticsEventName,
  AnalyticsProperties,
} from "@/lib/analytics/events";
import Link from "next/link";
import type { ComponentProps } from "react";

type TrackingProps = {
  event: AnalyticsEventName;
  eventProperties?: AnalyticsProperties;
};

export function TrackedLink({
  event,
  eventProperties,
  onClick,
  ...props
}: ComponentProps<typeof Link> & TrackingProps) {
  return (
    <Link
      {...props}
      onClick={(clickEvent) => {
        track(event, eventProperties);
        onClick?.(clickEvent);
      }}
    />
  );
}

export function TrackedAnchor({
  event,
  eventProperties,
  onClick,
  ...props
}: ComponentProps<"a"> & TrackingProps) {
  return (
    <a
      {...props}
      onClick={(clickEvent) => {
        track(event, eventProperties);
        onClick?.(clickEvent);
      }}
    />
  );
}
