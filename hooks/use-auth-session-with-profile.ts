"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { authKeys } from "@/features/personal-feed/query-keys";
import { getSessionWithUserProfile } from "@/features/personal-feed/services/auth";
import { useSupabaseBrowser } from "@/hooks/use-supabase-browser";

export function useAuthSessionWithProfile() {
  const supabase = useSupabaseBrowser();
  const queryClient = useQueryClient();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void queryClient.invalidateQueries({ queryKey: authKeys.all });
    });
    return () => subscription.unsubscribe();
  }, [supabase, queryClient]);

  return useQuery({
    queryKey: authKeys.sessionWithProfile(),
    queryFn: () => getSessionWithUserProfile(supabase),
  });
}
