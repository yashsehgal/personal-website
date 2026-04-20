import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import type {
  ICreateFeedMessageInput,
  IUpdateFeedMessageInput,
} from "@/features/personal-feed/interfaces";
import {
  createFeedMessage,
  deleteFeedMessage,
  getFeedMessageById,
  listMessagesForFeed,
  type IListFeedMessagesOptions,
  updateFeedMessage,
} from "@/features/personal-feed/services/feed-messages";

async function serverSupabase() {
  return createClient(await cookies());
}

export async function listFeedMessagesHandler(
  feedId: string,
  options?: IListFeedMessagesOptions,
) {
  const supabase = await serverSupabase();
  return listMessagesForFeed(supabase, feedId, options);
}

export async function getFeedMessageHandler(messageId: string) {
  const supabase = await serverSupabase();
  return getFeedMessageById(supabase, messageId);
}

export async function createFeedMessageHandler(input: ICreateFeedMessageInput) {
  const supabase = await serverSupabase();
  return createFeedMessage(supabase, input);
}

export async function updateFeedMessageHandler(
  messageId: string,
  patch: IUpdateFeedMessageInput,
) {
  const supabase = await serverSupabase();
  return updateFeedMessage(supabase, messageId, patch);
}

export async function deleteFeedMessageHandler(messageId: string) {
  const supabase = await serverSupabase();
  return deleteFeedMessage(supabase, messageId);
}
