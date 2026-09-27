"use server";

import { WEBSITE_ROUTES } from "@/common/routes";
import {
  DISCUSSION_TITLE_MAX_LENGTH,
  isDiscussionId,
  normalizeDiscussionTitle,
  sanitizeDiscussionBody,
  type DiscussionContent,
  type DiscussionMessage,
  type DiscussionSummary,
} from "@/lib/discussions/content";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

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

  revalidatePath(WEBSITE_ROUTES.APPS_DISCUSSIONS);
  revalidatePath(`${WEBSITE_ROUTES.APPS_DISCUSSIONS}/${data.id}`);

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

  revalidatePath(`${WEBSITE_ROUTES.APPS_DISCUSSIONS}/${discussionId}`);
  revalidatePath(WEBSITE_ROUTES.APPS_DISCUSSIONS);

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

export async function listDiscussionMessagesAction(
  discussionId: string,
): Promise<ActionResult<DiscussionMessage[]>> {
  if (!isDiscussionId(discussionId)) {
    return { ok: false, error: "Discussion not found." };
  }

  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("discussion_messages")
    .select("id, discussion_id, body, created_at")
    .eq("discussion_id", discussionId)
    .order("created_at", { ascending: true });

  if (error) {
    return { ok: false, error: "Unable to load replies." };
  }

  return {
    ok: true,
    data:
      data?.map((row) => ({
        id: row.id,
        discussionId: row.discussion_id,
        body: row.body as DiscussionContent,
        createdAt: row.created_at,
      })) ?? [],
  };
}
