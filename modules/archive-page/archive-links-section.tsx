import Link from "next/link";

const ARCHIVE_LINKS = [
  {
    id: "ARCHIVE_LINK_AUTOMATION_TRIGGERS",
    title: "Concept: Automation Triggers Workflow",
    href: "https://x.com/yashsehgaldev/status/1861593300823875738",
    year: 2025,
  },
  {
    id: "ARCHIVE_LINK_PLATFORM_INTEGRATIONS",
    title: "Concept: Platform Integrations",
    href: "https://x.com/yashsehgaldev/status/1878349925114949835",
    year: 2025,
  },
  {
    id: "ARCHIVE_LINK_CALENDAR_WIDGETS",
    title: "Calendar and event widgets",
    href: "https://x.com/yashsehgaldev/status/1898621497528467803",
    year: 2025,
  },
  {
    id: "ARCHIVE_LINK_LLM_TOOLS",
    title: "LLM Tools in StackAI",
    href: "https://x.com/yashsehgaldev/status/1976250373339021719",
    year: 2025,
  },
  {
    id: "ARCHIVE_LINK_KNOWLEDGE_BASE_CTA",
    title: "Knowledge Base CTA",
    href: "https://x.com/yashsehgaldev/status/1872315527550669240",
    year: 2024,
  },
  {
    id: "ARCHIVE_LINK_DYNAMIC_ISLAND",
    title: "Dynamic Island",
    href: "https://x.com/yashsehgaldev/status/1852582622528155984",
    year: 2024,
  },
  {
    id: "ARCHIVE_LINK_VSCODE_LAYOUT",
    title: "VSCode-like editor layout",
    href: "https://x.com/yashsehgaldev/status/1845536318211916102",
    year: 2024,
  },
] as const;

export function ArchiveLinksSection() {
  return (
    <section aria-label="Archived posts" className="flex flex-col items-stretch">
      {ARCHIVE_LINKS.map((archiveLink) => {
        return (
          <Link
            key={archiveLink.id}
            href={archiveLink.href}
            rel="noopener noreferrer"
            target="_blank"
            className="group flex items-center justify-between gap-8 py-2"
          >
            <span className="min-w-0 font-medium tracking-tight group-hover:bg-foreground group-hover:text-background">
              {archiveLink.title}
            </span>
            <span className="shrink-0 font-light tabular-nums tracking-tight text-muted-foreground">
              {archiveLink.year}
            </span>
          </Link>
        );
      })}
    </section>
  );
}
