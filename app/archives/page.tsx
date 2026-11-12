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

// Row rhythm, in px: each row is a 21px line plus a 4px gap, and a new year
// starts 12px further down. Used both for styling and for balancing columns.
const ROW_HEIGHT = 25;
const YEAR_GAP = 12;

type ArchiveItem = (typeof ARCHIVE_LINKS)[number];

type Column = { items: ArchiveItem[]; markOffset: number };

function columnHeight(items: readonly ArchiveItem[]) {
  return items.reduce(
    (height, item, index) =>
      height +
      ROW_HEIGHT +
      (index > 0 && items[index - 1].year !== item.year ? YEAR_GAP : 0),
    0,
  );
}

// Splits the list, in order, into `count` columns whose heights are as close
// as possible: every way of cutting it is tried and the one with the shortest
// tallest column wins. The list is small, so trying them all is instant.
function balanceColumns(items: readonly ArchiveItem[], count: number) {
  let best: number[] = [];
  let bestHeight = Infinity;

  function tryCuts(start: number, cuts: number[]) {
    if (cuts.length === count - 1) {
      const bounds = [0, ...cuts, items.length];
      const tallest = Math.max(
        ...bounds
          .slice(1)
          .map((end, i) => columnHeight(items.slice(bounds[i], end))),
      );
      if (tallest < bestHeight) {
        bestHeight = tallest;
        best = cuts;
      }
      return;
    }
    for (let cut = start + 1; cut < items.length; cut++) {
      tryCuts(cut, [...cuts, cut]);
    }
  }

  tryCuts(0, []);
  const bounds = [0, ...best, items.length];

  return bounds.slice(1).map<Column>((end, i) => ({
    items: items.slice(bounds[i], end),
    markOffset: bounds[i],
  }));
}

// The same list balanced for each layout. Only one is shown at a time; the
// others are display: none, so screen readers hear the list once.
const layouts = [
  { columns: balanceColumns(ARCHIVE_LINKS, 1), className: "grid lg:hidden" },
  {
    columns: balanceColumns(ARCHIVE_LINKS, 2),
    className: "hidden lg:grid lg:grid-cols-2 min-[90rem]:hidden",
  },
  {
    columns: balanceColumns(ARCHIVE_LINKS, 3),
    className: "hidden min-[90rem]:grid min-[90rem]:grid-cols-3",
  },
];

function ArchiveList({ items, markOffset }: Column) {
  return (
    // Rows sit 4px apart so neighbouring marks don't touch; a new year
    // starts 12px further down.
    <ul className="flex flex-col gap-1">
      {items.map((item, index) => {
        // The year is printed at the top of each column and wherever it
        // changes; other rows keep its width, invisibly, so their titles
        // stay in one column.
        const showYear = index === 0 || items[index - 1].year !== item.year;

        return (
          <li
            key={item.id}
            className={
              showYear && index > 0
                ? "mt-3 flex justify-between gap-4 lg:gap-8"
                : "flex justify-between gap-4 lg:gap-8"
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
    <div className="max-w-[420px] lg:max-w-none">
      {/* Magazine spacing around the display heading: a long drop from
          "Back" and a wide margin before the list, both scaling with the
          viewport (64px–144px above, 48px–96px below). */}
      <header className="page-header mb-[clamp(3rem,8vw,6rem)] flex flex-col">
        <Link href="/" className="mb-[clamp(4rem,12vw,9rem)] text-muted">
          Back
        </Link>
        {/* Display size: scales with the viewport between 56px and 160px,
            set tight so the word reads as one block. The negative margin pulls
            the A's side bearing back so its ink lines up with "Back". */}
        <h1 className="-ml-[0.025em] text-[clamp(3.5rem,15vw,10rem)] leading-[0.85] font-medium tracking-[-0.06em]">
          Archives
        </h1>
      </header>
      {/* From 1024px the columns share the full page width equally, with a
          gap that grows from 48px to 80px. Three height-balanced columns from
          90rem (1440px), where each is at least ~420px (the widest row needs
          404px with its 32px title gap); two from 1024px; one 420px list
          below that. The breakpoint is in rem so Tailwind orders it after lg.
          The bottom margin mirrors the drop above the heading (64px–144px),
          so the page ends with the same breathing room it opens with. */}
      <main className="mb-[clamp(4rem,12vw,9rem)]">
        {layouts.map((layout) => (
          <div
            key={layout.columns.length}
            className={`${layout.className} items-start gap-x-[clamp(3rem,4vw,5rem)]`}
          >
            {layout.columns.map((column) => (
              <ArchiveList
                key={column.markOffset}
                items={column.items}
                markOffset={column.markOffset}
              />
            ))}
          </div>
        ))}
      </main>
    </div>
  );
}
