import type { Metadata } from "next";
import Link from "next/link";
import { ContentLink } from "@/components/content-link";
import { WRITINGS as writings } from "@/lib/writings";

export const metadata: Metadata = {
  title: "Writings · Yash Sehgal",
  description: "Writing by Yash Sehgal.",
};

// Each row reads like the Archives list: year, title, type.

export default function Page() {
  return (
    <div className="max-w-[420px]">
      <header className="page-header mb-8 flex flex-col gap-0.5">
        <Link href="/" className="mb-6 text-muted">
          Back
        </Link>
        <h1 className="text-base">Writings</h1>
      </header>
      <main>
        <ul className="flex flex-col gap-1">
          {writings.map((writing, index) => {
            const showYear =
              index === 0 || writings[index - 1].year !== writing.year;

            return (
              <li key={writing.href} className="flex justify-between gap-4">
                <span className="flex min-w-0">
                  <span
                    className={
                      showYear
                        ? "shrink-0 whitespace-pre text-muted tabular-nums"
                        : "invisible shrink-0 whitespace-pre tabular-nums"
                    }
                    aria-hidden={showYear ? undefined : true}
                  >
                    {writing.year} /{" "}
                  </span>
                  <span className="min-w-0">
                    <ContentLink
                      href={writing.href}
                      mark={writing.mark}
                      external={false}
                    >
                      {writing.title}
                    </ContentLink>
                  </span>
                </span>
                <span className="shrink-0 text-right text-muted">
                  {writing.type}
                </span>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}
