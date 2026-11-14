"use client";

import { usePathname } from "next/navigation";

// Pages that have a raw markdown version, and the file it's served as.
// Add a page here once its route (app/<file>/route.ts) exists.
const sources: Record<string, string> = {
  "/": "index.md",
  "/archives": "archives.md",
};

// The last thing on the page, not fixed, so it can never sit over content.
// The body is a full-height column and mt-auto pushes this to its bottom:
// on a page shorter than the screen it rests bottom-left, opposite the
// shuffle button, its 32px box at the same 2rem inset so the label centres
// on the button's line. When the content is taller (small screens, zoom,
// long pages) it simply follows the content, at least 48px below it.
export function PageSource() {
  const file = sources[usePathname()];

  if (!file) {
    return null;
  }

  return (
    <footer className="mt-auto pt-12">
      {/* A plain link: the .md route is a file, not a page to prefetch. */}
      <a
        href={`/${file}`}
        className="inline-flex h-8 items-center text-muted transition-colors duration-150 ease-out hover:text-foreground focus-visible:text-foreground motion-reduce:transition-none"
      >
        {file}
      </a>
    </footer>
  );
}
