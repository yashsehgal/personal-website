/** Public contact email for site owner (mailto links, etc.). */
export const YASH_CONTACT_EMAIL = "yashsehgal.work@gmail.com" as const;

export function getYashMailtoHref(subject?: string): string {
  if (!subject) return `mailto:${YASH_CONTACT_EMAIL}`;
  return `mailto:${YASH_CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}
