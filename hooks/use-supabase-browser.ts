"use client";

import { useMemo } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";

export function useSupabaseBrowser(): SupabaseClient {
  return useMemo(() => createClient(), []);
}
