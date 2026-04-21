/** Public contact email for site owner (mailto links, etc.). */
export const YASH_CONTACT_EMAIL = "yashsehgal.work@gmail.com" as const;

export function getYashMailtoHref(options?: {
  subject?: string;
  body?: string;
}): string {
  const params = new URLSearchParams();
  if (options?.subject) params.set("subject", options.subject);
  if (options?.body) params.set("body", options.body);
  const qs = params.toString();
  return qs
    ? `mailto:${YASH_CONTACT_EMAIL}?${qs}`
    : `mailto:${YASH_CONTACT_EMAIL}`;
}
