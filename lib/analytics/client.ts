import posthog from "posthog-js";
import type { AnalyticsEventName, AnalyticsProperties } from "@/lib/analytics/events";

export function track(
  event: AnalyticsEventName,
  properties?: AnalyticsProperties,
) {
  if (!process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) {
    return;
  }

  posthog.capture(event, properties);
}

export function trackException(
  error: unknown,
  properties?: AnalyticsProperties,
) {
  if (!process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) {
    return;
  }

  posthog.captureException(error, properties);
}
