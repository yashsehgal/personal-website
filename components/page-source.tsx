"use client";

import { usePathname } from "next/navigation";

// Pages that have a raw markdown version, and the file it's served as.
// Add a page here once its route (app/<file>/route.ts) exists.
const sources: Record<string, string> = {
  "/": "index.md",
  "/archives": "archives.md",
};

// Bottom-left, opposite the shuffle button: a 32px-tall box at the same
// 2rem inset, so the label centres on the button's line.
export function PageSource() {
  const file = sources[usePathname()];

  if (!file) {
    return null;
  }

  return (
    <footer className="fixed bottom-8 left-8 z-20 flex h-8 items-center">
      {/* A plain link: the .md route is a file, not a page to prefetch. */}
      <a
        href={`/${file}`}
        className="text-muted transition-colors duration-150 ease-out hover:text-foreground focus-visible:text-foreground motion-reduce:transition-none"
      >
        {file}
      </a>
    </footer>
  );
}
