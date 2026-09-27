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
    return { ok: false, error: "Unable to start discussion. Try again." };
  }

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
    return { ok: false, error: "Unable to send reply. Try again." };
  }

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
  } catch {
    return { ok: false, error: "Unable to load discussions." };
  }
}

export async function getDiscussionThreadAction(
  id: string,
): Promise<ActionResult<DiscussionThread | null>> {
  try {
    return { ok: true, data: await getDiscussionThread(id) };
  } catch {
    return { ok: false, error: "Unable to load discussion." };
  }
}

