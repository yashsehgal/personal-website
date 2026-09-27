import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { cache } from "react";

function requiredEnv(name: "SUPABASE_URL" | "SUPABASE_PUBLISHABLE_KEY") {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing ${name}. Set it in the server environment.`);
  }

  return value;
}

function localSupabaseUrl() {
  const url = requiredEnv("SUPABASE_URL");

  if (process.env.NODE_ENV !== "production") {
    let parsed: URL;

    try {
      parsed = new URL(url);
    } catch {
      throw new Error("SUPABASE_URL must be a valid URL.");
    }

    const isLoopback =
      parsed.hostname === "127.0.0.1" || parsed.hostname === "localhost";

    if (!isLoopback) {
      throw new Error(
        "Development must use the local Supabase stack. Run `pnpm supabase:start` so SUPABASE_URL points at 127.0.0.1.",
      );
    }
  }

  return url;
}

export const getSupabaseServerClient = cache((): SupabaseClient => {
  return createClient(localSupabaseUrl(), requiredEnv("SUPABASE_PUBLISHABLE_KEY"), {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
});
