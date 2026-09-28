import { createHighlighter, type Highlighter } from "shiki";
import "server-only";

const highlighter: Promise<Highlighter> = createHighlighter({
  themes: ["github-light", "github-dark"],
  langs: ["typescript"],
});

export async function CodeSample({ code }: { code: string }) {
  const html = (await highlighter).codeToHtml(code.replace(/^\n/, "").replace(/\s+$/, ""), {
    lang: "typescript",
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  });

  return (
    <div
      className="code-sample w-full min-w-0 overflow-x-auto rounded-lg border border-border"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
