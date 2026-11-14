// Raw markdown versions of the site's pages, built from the same data the
// pages render, so each .md route always matches its page. Site navigation
// ("Back", the top-right links) is left out; only the page's own content is.

import { ARCHIVE_LINKS } from "@/lib/archive";
import {
  contact,
  type Inline,
  intro,
  name,
  skills,
  tagline,
  work,
} from "@/lib/home";
import { WRITINGS } from "@/lib/writings";

function inline(parts: readonly Inline[]) {
  return parts
    .map((part) =>
      typeof part === "string" ? part : `[${part.text}](${part.href})`,
    )
    .join("");
}

function document(blocks: string[]) {
  return `${blocks.join("\n\n")}\n`;
}

export function homeMarkdown() {
  return document([
    `# ${name}`,
    tagline,
    ...intro.map(inline),
    work
      .map(
        (item) =>
          `- ${item.year} / [${item.company}](${item.href}) — ${item.role}`,
      )
      .join("\n"),
    skills
      .map(
        (skill) => `- Skill / [${skill.name}](${skill.href}) — ${skill.about}`,
      )
      .join("\n"),
    inline(contact),
  ]);
}

export function archivesMarkdown() {
  // ARCHIVE_LINKS is already newest year first; one section per year.
  const years = [...new Set(ARCHIVE_LINKS.map((item) => item.year))];

  return document([
    "# Archives",
    ...years.map((year) =>
      [
        `## ${year}`,
        "",
        ...ARCHIVE_LINKS.filter((item) => item.year === year).map(
          (item) => `- [${item.title}](${item.href}) — ${item.type}`,
        ),
      ].join("\n"),
    ),
  ]);
}

export function writingsMarkdown() {
  // WRITINGS is already newest first; one section per year, like Archives.
  const years = [...new Set(WRITINGS.map((item) => item.year))];

  return document([
    "# Writings",
    ...years.map((year) =>
      [
        `## ${year}`,
        "",
        ...WRITINGS.filter((item) => item.year === year).map(
          (item) => `- [${item.title}](${item.href}) — ${item.type}`,
        ),
      ].join("\n"),
    ),
  ]);
}

// Served as UTF-8 markdown and shown in the browser rather than downloaded.
export function markdownResponse(body: string) {
  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": "inline",
    },
  });
}
