import { archivesMarkdown, markdownResponse } from "@/lib/markdown";

// The Archives page as raw markdown, at /archives.md. It reads no request
// data, so it's prerendered at build time.
export function GET() {
  return markdownResponse(archivesMarkdown());
}
