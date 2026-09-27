function getPart(
  parts: Intl.DateTimeFormatPart[],
  type: Intl.DateTimeFormatPartTypes,
) {
  return parts.find((part) => part.type === type)?.value ?? "";
}

function dateParts(iso: string) {
  return new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).formatToParts(new Date(iso));
}

export function formatDiscussionDate(iso: string) {
  const parts = dateParts(iso);
  return `${getPart(parts, "day")} ${getPart(parts, "month")} ${getPart(parts, "year")}`;
}

export function formatDiscussionDateTime(iso: string) {
  const date = formatDiscussionDate(iso);
  const time = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));

  return `${date}, ${time}`;
}
