import type { Metadata } from "next";
import Link from "next/link";
import { ContentLink } from "@/components/content-link";
import { ARCHIVE_LINKS } from "@/lib/archive";

export const metadata: Metadata = {
  title: "Archives · Yash Sehgal",
  description:
    "Design, widget and engineering experiments by Yash Sehgal, by year.",
};

// ContentLink has ten hand-drawn marks; cycle through them down the list.
const MARK_COUNT = 10;

export default function Page() {
  return (
    <div className="max-w-[420px]">
      <header className="page-header mb-8 flex flex-col gap-0.5">
        <Link href="/" className="mb-6 text-muted">
          Back
        </Link>
        <h1 className="text-base">Archives</h1>
      </header>
      <main>
        <ul>
          {ARCHIVE_LINKS.map((item, index) => {
            // Each year is printed once; later rows in the same year keep its
            // width, invisibly, so their titles stay in one column.
            const showYear =
              index === 0 || ARCHIVE_LINKS[index - 1].year !== item.year;

            return (
              <li key={item.id} className="flex justify-between gap-4">
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
                    <ContentLink href={item.href} mark={index % MARK_COUNT}>
                      {item.title}
                    </ContentLink>
                  </span>
                </span>
                <span className="shrink-0 text-right">{item.type}</span>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}
