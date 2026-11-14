"use client";

import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// An open article lives one level under /writings.
const ARTICLE_PATH = /^\/writings\/[^/]+\/?$/;

// How long the check mark stays before the link icon returns.
const COPIED_MS = 1600;

// How long the "Copied!" tooltip shows after a copy.
const FLASH_MS = 1200;

const IDLE_LABEL = "Copy link · L";
const COPIED_LABEL = "Copied!";

// A tooltip label that changes in place: the box eases to the new label's
// width while the old text fades out and the new one fades in over it.
// Every label is stacked in one grid cell; the box is clipped to the width
// measured for the current one. The tooltip is anchored by its right edge,
// so it grows and shrinks from the left. With reduced motion the width and
// text change at once.
function MorphLabel({
  text,
  labels,
}: {
  text: string;
  labels: readonly string[];
}) {
  const box = useRef<HTMLSpanElement>(null);
  const measure = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (box.current && measure.current) {
      box.current.style.width = `${measure.current.getBoundingClientRect().width}px`;
    }
  }, [text]);

  return (
    <span
      ref={box}
      className="relative inline-grid overflow-hidden whitespace-nowrap transition-[width] duration-200 ease-out motion-reduce:transition-none"
    >
      <span ref={measure} className="invisible absolute">
        {text}
      </span>
      {labels.map((label) => (
        <span
          key={label}
          className={`col-start-1 row-start-1 transition-opacity duration-150 ease-out motion-reduce:transition-none ${
            label === text ? "opacity-100" : "opacity-0"
          }`}
        >
          {label}
        </span>
      ))}
    </span>
  );
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Older browsers, or a page without clipboard permission: fall back to
    // a hidden field and the copy command.
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.append(field);
    field.select();
    const copied = document.execCommand("copy");
    field.remove();
    return copied;
  }
}

// Beside the shuffle button, only while an article is open. It scales up
// into place when the article opens and scales down out of it when the
// article closes, and on copy the link icon crossfades into a check mark
// and back (see button.copy-link in globals.css).
export function CopyLink() {
  const isArticle = ARTICLE_PATH.test(usePathname());
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState("");
  const timer = useRef<number | undefined>(undefined);

  // The tooltip opens on hover as usual, and also briefly on its own with
  // "Copied!" after any copy (a click closes a hover tooltip, and the L key
  // has no pointer to open one).
  const [hovered, setHovered] = useState(false);
  const [flash, setFlash] = useState(false);
  const flashTimer = useRef<number | undefined>(undefined);

  // The tooltip closes itself when its button is pressed or clicked. While a
  // press is in progress those closes are ignored, so the open hover tooltip
  // stays the same instance and its label changes to "Copied!" in place.
  const pressing = useRef(false);
  function holdThroughPress() {
    pressing.current = true;
    // Runs once the tooltip's own handler for this event has fired.
    queueMicrotask(() => {
      pressing.current = false;
    });
  }
  function onOpenChange(open: boolean) {
    if (!open && pressing.current) {
      return;
    }
    setHovered(open);
  }

  // Stays rendered after the article closes, until its exit animation ends.
  const [rendered, setRendered] = useState(isArticle);
  if (isArticle && !rendered) {
    setRendered(true);
  }
  const leaving = rendered && !isArticle;

  useEffect(
    () => () => {
      window.clearTimeout(timer.current);
      window.clearTimeout(flashTimer.current);
    },
    [],
  );

  const copy = useCallback(async () => {
    const ok = await copyText(window.location.href);
    window.clearTimeout(timer.current);

    if (!ok) {
      setStatus("Couldn't copy the link.");
      return false;
    }

    setCopied(true);
    setStatus("Link copied.");
    timer.current = window.setTimeout(() => setCopied(false), COPIED_MS);
    return true;
  }, []);

  // Every copy, by click or by the L key, shows the same "Copied!" tooltip
  // for a moment, then lets it close with its usual fade.
  const copyAndConfirm = useCallback(async () => {
    if (!(await copy())) {
      return;
    }

    window.clearTimeout(flashTimer.current);
    setFlash(true);
    flashTimer.current = window.setTimeout(() => setFlash(false), FLASH_MS);
  }, [copy]);

  // Pressing L on an open article copies its link, with the same rules as
  // the S shortcut for shuffling: not while typing in fields or editable
  // text, not with Cmd, Ctrl or Alt held, and not on a held key's repeat.
  useEffect(() => {
    if (!isArticle) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (
        event.key.toLowerCase() !== "l" ||
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

      void copyAndConfirm();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isArticle, copyAndConfirm]);

  if (!rendered) {
    return null;
  }

  return (
    <>
      <Tooltip
        open={!leaving && (flash || hovered)}
        onOpenChange={onOpenChange}
      >
        <TooltipTrigger asChild>
          <button
            type="button"
            className="copy-link"
            aria-label="Copy link to this article"
            aria-keyshortcuts="L"
            aria-hidden={leaving ? true : undefined}
            tabIndex={leaving ? -1 : undefined}
            data-copied={copied ? "" : undefined}
            data-leaving={leaving ? "" : undefined}
            onPointerDown={holdThroughPress}
            onClick={() => {
              holdThroughPress();
              void copyAndConfirm();
            }}
            onAnimationEnd={(event) => {
              // Both exits, the scale-down and the reduced-motion fade, end
              // here; then the button is removed.
              if (leaving && event.target === event.currentTarget) {
                setRendered(false);
                setCopied(false);
              }
            }}
          >
            <svg
              className="copy-link-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
            <svg
              className="copy-link-check"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </button>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          align="end"
          aria-hidden="true"
          className="motion-reduce:animate-none motion-reduce:data-closed:animate-none motion-reduce:data-open:animate-none"
        >
          <MorphLabel
            text={flash || copied ? COPIED_LABEL : IDLE_LABEL}
            labels={[IDLE_LABEL, COPIED_LABEL]}
          />
        </TooltipContent>
      </Tooltip>
      <p className="sr-only" role="status">
        {status}
      </p>
    </>
  );
}
