"use server";

import {
  DISCUSSION_TITLE_MAX_LENGTH,
  isDiscussionId,
  normalizeDiscussionTitle,
  sanitizeDiscussionBody,
  type DiscussionContent,
  type DiscussionMessage,
  type DiscussionSummary,
  type DiscussionThread,
} from "@/lib/discussions/content";
import {
  getDiscussionThread,
  listDiscussions,
} from "@/lib/discussions/queries";
import { AnalyticsEvent } from "@/lib/analytics/events";
import { trackServer, trackServerException } from "@/lib/analytics/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

export async function createDiscussionAction(
  titleInput: string,
): Promise<ActionResult<DiscussionSummary>> {
  const title = normalizeDiscussionTitle(titleInput);

  if (!title) {
    return { ok: false, error: "Enter a title to start a discussion." };
  }

  if (title.length > DISCUSSION_TITLE_MAX_LENGTH) {
    return {
      ok: false,
      error: `Use a title of ${DISCUSSION_TITLE_MAX_LENGTH} characters or fewer.`,
    };
  }

  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("discussions")
    .insert({ title })
    .select("id, title, created_at")
    .single();

  if (error || !data) {
    await trackServerException(
      error ?? new Error("Unable to start discussion."),
      { action: "create_discussion" },
    );
    await trackServer(AnalyticsEvent.DISCUSSIONS_CREATE_FAILED);
    return { ok: false, error: "Unable to start discussion. Try again." };
  }

  await trackServer(AnalyticsEvent.DISCUSSIONS_CREATED, {
    discussion_id: data.id,
    title_length: title.length,
  });

  return {
    ok: true,
    data: {
      id: data.id,
      title: data.title,
      createdAt: data.created_at,
      replyCount: 0,
    },
  };
}

export async function createDiscussionMessageAction(
  discussionId: string,
  bodyInput: unknown,
): Promise<ActionResult<DiscussionMessage>> {
  if (!isDiscussionId(discussionId)) {
    return { ok: false, error: "Discussion not found." };
  }

  const body = sanitizeDiscussionBody(bodyInput);

  if (!body) {
    return { ok: false, error: "Write a reply before sending." };
  }

  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("discussion_messages")
    .insert({ discussion_id: discussionId, body })
    .select("id, discussion_id, body, created_at")
    .single();

  if (error || !data) {
    await trackServerException(error ?? new Error("Unable to send reply."), {
      action: "create_discussion_reply",
      discussion_id: discussionId,
    });
    await trackServer(AnalyticsEvent.DISCUSSIONS_REPLY_FAILED, {
      discussion_id: discussionId,
    });
    return { ok: false, error: "Unable to send reply. Try again." };
  }

  await trackServer(AnalyticsEvent.DISCUSSIONS_REPLY_CREATED, {
    discussion_id: discussionId,
    message_id: data.id,
  });

  return {
    ok: true,
    data: {
      id: data.id,
      discussionId: data.discussion_id,
      body: data.body as DiscussionContent,
      createdAt: data.created_at,
    },
  };
}

export async function listDiscussionsAction(): Promise<
  ActionResult<DiscussionSummary[]>
> {
  try {
    return { ok: true, data: await listDiscussions() };
  } catch (error) {
    await trackServerException(error, { action: "list_discussions" });
    return { ok: false, error: "Unable to load discussions." };
  }
}

export async function getDiscussionThreadAction(
  id: string,
): Promise<ActionResult<DiscussionThread | null>> {
  try {
    return { ok: true, data: await getDiscussionThread(id) };
  } catch (error) {
    await trackServerException(error, {
      action: "get_discussion",
      discussion_id: id,
    });
    return { ok: false, error: "Unable to load discussion." };
  }
}

