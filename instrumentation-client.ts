import posthog from "posthog-js";

const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;

if (token) {
  posthog.init(token, {
    api_host: "/ingest",
    ui_host: "https://us.posthog.com",
    defaults: "2026-01-30",
    // Named events in lib/analytics/events.ts replace generic click capture.
    autocapture: false,
    capture_exceptions: true,
  });
}

// Do not also mount a PostHogProvider. instrumentation-client.ts is the
// client setup for Next.js 15.3+.
