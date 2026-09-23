"use client";

import { WEBSITE_ROUTES, WebsiteRouteType } from "@/common/routes";
import { cn } from "cn";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type MouseEvent,
  type TransitionEvent,
} from "react";

const NAVIGATION_ITEMS: { label: string; href: WebsiteRouteType }[] = [
  { label: "Work", href: WEBSITE_ROUTES.WORK },
  { label: "Writings", href: WEBSITE_ROUTES.WRITINGS },
  { label: "Photography", href: WEBSITE_ROUTES.PHOTOGRAPHY },
] as const;

const SOCIAL_LINKS: {
  label: string;
  href: string;
  overrideHoverClassname: string;
}[] = [
  {
    label: "X (Twitter)",
    href: "https://x.com/yashsehgaldev",
    overrideHoverClassname: "hover:bg-foreground hover:text-background",
  },
  {
    label: "GitHub",
    href: "https://github.com/yashsehgal",
    overrideHoverClassname: "hover:bg-foreground hover:text-background",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/sehgalyash_/",
    overrideHoverClassname: "hover:bg-pink-500 hover:text-white",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sehgalyash/",
    overrideHoverClassname: "hover:bg-sky-600 hover:text-white",
  },
  {
    label: "hi@yashsehgal.com",
    href: "mailto:hi@yashsehgal.com",
    overrideHoverClassname: "hover:bg-rose-500 hover:text-white",
  },
] as const;

const EMAIL_ADDRESS = "hi@yashsehgal.com";
const COPY_FEEDBACK_LABEL = "Email copied";
const COPY_FEEDBACK_DURATION_MS = 2000;

type CopyFeedbackPhase = "idle" | "copied" | "done";

function useIsMac() {
  return useSyncExternalStore(
    () => () => {},
    () => /Mac|iPhone|iPad|iPod/.test(navigator.userAgent),
    () => false,
  );
}

function KeyCap({ children }: { children: string }) {
  return (
    <kbd className="inline-flex h-4 min-w-4 items-center justify-center rounded-sm bg-foreground/8 px-1 font-mono text-[11px] leading-none text-muted-foreground uppercase shadow-[inset_0_-1px_0_oklch(0_0_0/0.12)] ring-1 ring-foreground/10 dark:bg-white/14 dark:shadow-[inset_0_1px_0_oklch(1_0_0/0.16)] dark:ring-white/10">
      {children}
    </kbd>
  );
}

export function MainSidebarNavigation() {
  const pathname = usePathname();
  const emailHintId = useId();
  const isMac = useIsMac();
  const [isEmailHovered, setIsEmailHovered] = useState(false);
  const [copyFeedbackPhase, setCopyFeedbackPhase] =
    useState<CopyFeedbackPhase>("idle");
  const [skipCopyFeedbackTransition, setSkipCopyFeedbackTransition] =
    useState(false);
  const copyFeedbackTimerRef = useRef<number | null>(null);

  const isHomePageActive = useMemo(
    () => pathname === WEBSITE_ROUTES.HOME,
    [pathname],
  );

  const isNavigationItemActive = useCallback(
    (href: WebsiteRouteType) => {
      return pathname === href || pathname.startsWith(`${href}/`);
    },
    [pathname],
  );

  const clearCopyFeedbackTimer = useCallback(() => {
    if (copyFeedbackTimerRef.current === null) {
      return;
    }

    window.clearTimeout(copyFeedbackTimerRef.current);
    copyFeedbackTimerRef.current = null;
  }, []);

  const showCopyFeedback = useCallback(() => {
    clearCopyFeedbackTimer();
    setSkipCopyFeedbackTransition(false);
    setCopyFeedbackPhase("copied");
    copyFeedbackTimerRef.current = window.setTimeout(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) {
        setCopyFeedbackPhase("idle");
        return;
      }

      setCopyFeedbackPhase("done");
    }, COPY_FEEDBACK_DURATION_MS);
  }, [clearCopyFeedbackTimer]);

  const dismissCopyFeedback = useCallback(() => {
    clearCopyFeedbackTimer();
    setCopyFeedbackPhase((phase) => (phase === "copied" ? "idle" : phase));
  }, [clearCopyFeedbackTimer]);

  const handleCopyFeedbackTransitionEnd = (
    event: TransitionEvent<HTMLSpanElement>,
  ) => {
    if (
      event.target !== event.currentTarget ||
      event.propertyName !== "translate" ||
      copyFeedbackPhase !== "done"
    ) {
      return;
    }

    setSkipCopyFeedbackTransition(true);
    setCopyFeedbackPhase("idle");
  };

  useEffect(() => {
    if (!skipCopyFeedbackTransition) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      setSkipCopyFeedbackTransition(false);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [skipCopyFeedbackTransition]);

  useEffect(() => clearCopyFeedbackTimer, [clearCopyFeedbackTimer]);

  const handleEmailClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      if (!event.metaKey && !event.ctrlKey) {
        return;
      }

      event.preventDefault();
      void navigator.clipboard.writeText(EMAIL_ADDRESS).then(() => {
        showCopyFeedback();
      });
    },
    [showCopyFeedback],
  );

  const dimmedClassName = cn(
    "transition-[opacity,filter] duration-150 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none",
    isEmailHovered && "opacity-60 blur-xs",
  );

  return (
    <aside className="sticky top-8 flex w-72 shrink-0 flex-col items-start gap-4">
      <header className={cn("px-1", dimmedClassName)}>
        <Link href={WEBSITE_ROUTES.HOME} className="size-fit block">
          <div
            className={cn(
              "flex flex-col gap-3 size-fit",
              isHomePageActive
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
            aria-label="Yash Sehgal, Design Engineer"
          >
            <Image
              src="/assets/initials.svg"
              alt=""
              width={168}
              height={150}
              aria-hidden="true"
              className="size-10 select-none dark:invert"
              draggable={false}
              priority
              unoptimized
            />
            <div className="flex flex-col gap-0.5">
              <p
                className="font-medium tracking-tight text-sm"
                aria-hidden="true"
              >
                Yash Sehgal
              </p>
              <p className="tracking-tight text-sm" aria-hidden="true">
                Design Engineer
              </p>
            </div>
          </div>
        </Link>
      </header>
      <nav className={dimmedClassName}>
        <ul>
          {NAVIGATION_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "text-sm tracking-tight font-medium select-none rounded px-1 py-0.5",
                  isNavigationItemActive(item.href)
                    ? "text-foreground bg-muted"
                    : "text-muted-foreground hover:bg-muted",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <footer>
        <ul>
          {SOCIAL_LINKS.map((link) => {
            const isEmail = link.href === `mailto:${EMAIL_ADDRESS}`;

            return (
              <li
                key={link.href}
                className={cn("relative", !isEmail && dimmedClassName)}
                onMouseEnter={
                  isEmail ? () => setIsEmailHovered(true) : undefined
                }
                onMouseLeave={
                  isEmail
                    ? () => {
                        setIsEmailHovered(false);
                        dismissCopyFeedback();
                      }
                    : undefined
                }
              >
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href={link.href}
                  aria-describedby={isEmail ? emailHintId : undefined}
                  onClick={isEmail ? handleEmailClick : undefined}
                  onFocus={isEmail ? () => setIsEmailHovered(true) : undefined}
                  onBlur={isEmail ? () => setIsEmailHovered(false) : undefined}
                  className={cn(
                    "font-medium text-sm tracking-tight text-muted-foreground rounded px-1 py-0.5",
                    link.overrideHoverClassname,
                  )}
                >
                  {isEmail ? (
                    <span className="inline-grid">
                      <span className="sr-only">
                        {copyFeedbackPhase === "copied"
                          ? COPY_FEEDBACK_LABEL
                          : EMAIL_ADDRESS}
                      </span>
                      <span className="col-start-1 row-start-1 h-5 overflow-hidden">
                        <span
                          aria-hidden="true"
                          onTransitionEnd={handleCopyFeedbackTransitionEnd}
                          className={cn(
                            "flex flex-col",
                            !skipCopyFeedbackTransition &&
                              "transition-[translate] duration-300 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none",
                            copyFeedbackPhase === "copied" && "-translate-y-5",
                            copyFeedbackPhase === "done" && "-translate-y-10",
                          )}
                        >
                          <span className="h-5 leading-5 whitespace-nowrap">
                            {EMAIL_ADDRESS}
                          </span>
                          <span className="h-5 leading-5 whitespace-nowrap">
                            {COPY_FEEDBACK_LABEL}
                          </span>
                          <span className="h-5 leading-5 whitespace-nowrap">
                            {EMAIL_ADDRESS}
                          </span>
                        </span>
                      </span>
                    </span>
                  ) : (
                    link.label
                  )}
                </Link>
                {isEmail ? (
                  <span
                    id={emailHintId}
                    className={cn(
                      "absolute top-full left-1 z-10 mt-3 flex w-max flex-col gap-3 text-xs text-muted-foreground",
                      "transition-[opacity,translate] duration-200 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none",
                      isEmailHovered
                        ? "translate-y-0 opacity-100"
                        : "pointer-events-none translate-y-1 opacity-0",
                    )}
                  >
                    <span>
                      <KeyCap>Click</KeyCap> to open mail
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <span className="sr-only">
                        {isMac ? "Command-click" : "Control-click"}
                      </span>
                      <span
                        aria-hidden="true"
                        className="inline-flex items-center gap-1"
                      >
                        <KeyCap>{isMac ? "⌘" : "Ctrl"}</KeyCap>
                        <KeyCap>Click</KeyCap>
                      </span>
                      to copy the email
                    </span>
                  </span>
                ) : null}
              </li>
            );
          })}
        </ul>
      </footer>
    </aside>
  );
}
