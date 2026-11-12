import type { Metadata } from "next";
import Link from "next/link";
import { ContentLink } from "@/components/content-link";
import { ARCHIVE_LINKS } from "@/lib/archive";

export const metadata: Metadata = {
  title: "Archives · Yash Sehgal",
  description:
    "Design, widget and engineering experiments by Yash Sehgal, by year.",
};

// ContentLink has ten hand-drawn marks; cycle through them down the page.
const MARK_COUNT = 10;

// Posts from this year on count as recent; everything before is earlier.
const RECENT_FROM_YEAR = 2026;

type ArchiveItem = (typeof ARCHIVE_LINKS)[number];

const recent = ARCHIVE_LINKS.filter((item) => item.year >= RECENT_FROM_YEAR);
const earlier = ARCHIVE_LINKS.filter((item) => item.year < RECENT_FROM_YEAR);

// markOffset carries the mark cycle on from one group to the next.
const groups = [
  { title: "Recent", items: recent, markOffset: 0 },
  { title: "Earlier", items: earlier, markOffset: recent.length },
].filter((group) => group.items.length > 0);

function ArchiveList({
  items,
  markOffset,
}: {
  items: readonly ArchiveItem[];
  markOffset: number;
}) {
  return (
    // Rows sit 4px apart so neighbouring marks don't touch. A new year starts
    // 16px down, the same gap that separates the two lists when they stack.
    <ul className="flex flex-col gap-1">
      {items.map((item, index) => {
        // Each year is printed once; later rows in the same year keep its
        // width, invisibly, so their titles stay in one column.
        const showYear = index === 0 || items[index - 1].year !== item.year;

        return (
          <li
            key={item.id}
            className={
              showYear && index > 0
                ? "mt-3 flex justify-between gap-4"
                : "flex justify-between gap-4"
            }
          >
            <span className="flex min-w-0">
              <span
                className={
                  showYear
                    ? "shrink-0 whitespace-pre text-muted tabular-nums"
                    : "invisible shrink-0 whitespace-pre tabular-nums"
                }
                aria-hidden={showYear ? undefined : true}
              >
                {item.year} /{" "}
              </span>
              {/* Its own column, so a long title wraps under itself. */}
              <span className="min-w-0">
                <ContentLink
                  href={item.href}
                  mark={(markOffset + index) % MARK_COUNT}
                >
                  {item.title}
                </ContentLink>
              </span>
            </span>
            <span className="shrink-0 text-right text-muted">{item.type}</span>
          </li>
        );
      })}
    </ul>
  );
}

export default function Page() {
  return (
    <div className="max-w-[420px] lg:max-w-[880px]">
      <header className="page-header mb-8 flex flex-col gap-0.5">
        <Link href="/" className="mb-6 text-muted">
          Back
        </Link>
        <h1 className="text-base">Archives</h1>
      </header>
      {/* Side by side from 1024px up, where each column gets ~400px. Below
          that the groups stack and read as one list, the year gap marking
          where one ends. */}
      <main className="grid gap-x-16 gap-y-4 lg:grid-cols-2 lg:items-start">
        {groups.map((group) => (
          <section key={group.title} aria-label={group.title}>
            <ArchiveList items={group.items} markOffset={group.markOffset} />
          </section>
        ))}
      </main>
    </div>
  );
}
