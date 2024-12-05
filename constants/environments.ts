export const SUPABASE = {
  PROJECT_URL: process.env['NEXT_PUBLIC_SUPABASE_PROJECT_URL'] as string,
  API_KEY: process.env['NEXT_PUBLIC_SUPABASE_API_KEY'] as string,
} as const;

export const POSTHOG = {
  API_KEY: process.env['NEXT_PUBLIC_POSTHOG_KEY'] as string,
  HOST_URL: process.env['NEXT_PUBLIC_POSTHOG_HOST'] as string,
} as const;
