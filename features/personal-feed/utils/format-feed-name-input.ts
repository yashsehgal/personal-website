import type { ChangeEvent } from "react";

/** Lowercase and replace whitespace runs with a single hyphen (feed name input). */
export function formatFeedNameInput(value: string): string {
  return value.toLowerCase().replace(/\s+/g, "-");
}

/** Use as an `onChange` handler body: reads the event and passes the formatted string to `setValue`. */
export function handleFeedNameInputChange(
  event: ChangeEvent<HTMLInputElement>,
  setValue: (formatted: string) => void,
): void {
  setValue(formatFeedNameInput(event.currentTarget.value));
}
