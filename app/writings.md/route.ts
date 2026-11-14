import { markdownResponse, writingsMarkdown } from "@/lib/markdown";

// The Writings page as raw markdown, at /writings.md. It reads no request
// data, so it's prerendered at build time.
export function GET() {
  return markdownResponse(writingsMarkdown());
}
