"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { THEME_STORAGE_KEY, applyTheme, themes } from "@/lib/themes";

export function ThemeShuffle() {
  const [status, setStatus] = useState("");

  const shuffle = useCallback(() => {
    const root = document.documentElement;
    const current = root.dataset.theme ?? "0";
    let next = Number(current);

    while (String(next) === current) {
      next = Math.floor(Math.random() * themes.length);
    }

    const theme = themes[next];

    if (!theme) {
      return;
    }

    applyTheme(next);

    try {
      localStorage.setItem(THEME_STORAGE_KEY, String(next));
    } catch {
      // Private mode can block storage; the theme still applies for this visit.
    }

    setStatus(`Color theme changed to ${theme.name}.`);
  }, []);

  // Pressing S anywhere shuffles too. It stays out of the way of typing (in
  // fields and editable text), of browser and OS shortcuts (with Cmd, Ctrl
  // or Alt), and of a held key's auto-repeat.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (
        event.key.toLowerCase() !== "s" ||
        event.repeat ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.defaultPrevented
      ) {
        return;
      }

      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          target.closest("input, textarea, select") !== null)
      ) {
        return;
      }

      shuffle();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [shuffle]);

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className="theme-shuffle"
            aria-label="Shuffle colors"
            aria-keyshortcuts="S"
            onClick={shuffle}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m18 14 4 4-4 4" />
              <path d="m18 2 4 4-4 4" />
              <path d="M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22" />
              <path d="M2 6h1.991a4 4 0 0 1 3.6 2.2" />
              <path d="M22 18h-2.146a4 4 0 0 1-3.6-2.2l-.473-.8" />
            </svg>
          </button>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          align="end"
          aria-hidden="true"
          className="motion-reduce:animate-none motion-reduce:data-closed:animate-none motion-reduce:data-open:animate-none"
        >
          Shuffle colors · S
        </TooltipContent>
      </Tooltip>
      <p className="sr-only" role="status">
        {status}
      </p>
    </>
  );
}
