import { homeMarkdown, markdownResponse } from "@/lib/markdown";

// The home page as raw markdown, at /index.md. It reads no request data,
// so it's prerendered at build time.
export function GET() {
  return markdownResponse(homeMarkdown());
}
