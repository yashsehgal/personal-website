import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import type { IUpsertProfileInput } from "@/features/personal-feed/interfaces";
import {
  ensureMyProfile,
  getProfileByUserId,
  listProfilesByUserIds,
  updateMyProfile,
} from "@/features/personal-feed/services/profiles";

async function serverSupabase() {
  return createClient(await cookies());
}

export async function getProfileHandler(userId: string) {
  const supabase = await serverSupabase();
  return getProfileByUserId(supabase, userId);
}

export async function listProfilesByUserIdsHandler(userIds: string[]) {
  const supabase = await serverSupabase();
  return listProfilesByUserIds(supabase, userIds);
}

export async function updateMyProfileHandler(patch: IUpsertProfileInput) {
  const supabase = await serverSupabase();
  return updateMyProfile(supabase, patch);
}

export async function ensureMyProfileHandler() {
  const supabase = await serverSupabase();
  return ensureMyProfile(supabase);
}
