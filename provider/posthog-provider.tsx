// app/providers.tsx
'use client';
import { POSTHOG } from '@/constants/environments';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { useEffect } from 'react';

export function PHProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(POSTHOG.API_KEY, {
      api_host: POSTHOG.HOST_URL,
      person_profiles: 'identified_only',
      capture_pageview: false,
    });
  }, []);

  if (
    process.env.NODE_ENV === 'production' ||
    process.env.NODE_ENV === 'test'
  ) {
    return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
  }

  return children;
}
