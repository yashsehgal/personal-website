import "server-only";

import type {
  AnalyticsEventName,
  AnalyticsProperties,
} from "@/lib/analytics/events";
import { PostHog } from "posthog-node";
import { cookies } from "next/headers";

let posthogClient: PostHog | null = null;

function getPostHogClient() {
  const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

  if (!token || !host) {
    return null;
  }

  if (!posthogClient) {
    posthogClient = new PostHog(token, {
      host,
      flushAt: 1,
      flushInterval: 0,
    });
  }

  return posthogClient;
}

function parsePostHogCookie(raw: string) {
  const candidates = [raw];

  try {
    candidates.push(decodeURIComponent(raw));
  } catch {
    // The cookie is already decoded.
  }

  for (const value of candidates) {
    try {
      return JSON.parse(value) as {
        distinct_id?: unknown;
        $sesid?: unknown;
      };
    } catch {
      // Try the next encoding.
    }
  }

  return null;
}

async function getPostHogIdentity() {
  const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;

  if (!token) {
    return null;
  }

  const raw = (await cookies()).get(`ph_${token}_posthog`)?.value;

  if (!raw) {
    return null;
  }

  const parsed = parsePostHogCookie(raw);
  const distinctId = parsed?.distinct_id;

  if (typeof distinctId !== "string" || distinctId.length === 0) {
    return null;
  }

  const sessionId =
    Array.isArray(parsed?.$sesid) && typeof parsed.$sesid[1] === "string"
      ? parsed.$sesid[1]
      : undefined;

  return { distinctId, sessionId };
}

function withSession(
  properties: AnalyticsProperties | undefined,
  sessionId: string | undefined,
) {
  if (!sessionId) {
    return properties;
  }

  return { ...properties, $session_id: sessionId };
}

export async function trackServer(
  event: AnalyticsEventName,
  properties?: AnalyticsProperties,
) {
  try {
    const posthog = getPostHogClient();
    const identity = await getPostHogIdentity();

    if (!posthog || !identity) {
      return;
    }

    await posthog.captureImmediate({
      distinctId: identity.distinctId,
      event,
      properties: withSession(properties, identity.sessionId),
    });
  } catch {
    // Analytics must not change the result of a user action.
  }
}

export async function trackServerException(
  error: unknown,
  properties?: AnalyticsProperties,
) {
  try {
    const posthog = getPostHogClient();
    const identity = await getPostHogIdentity();

    if (!posthog || !identity) {
      return;
    }

    await posthog.captureExceptionImmediate(
      error,
      identity.distinctId,
      withSession(properties, identity.sessionId),
    );
  } catch {
    // Analytics must not change the result of a user action.
  }
}
