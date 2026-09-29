"use client";

import { WEBSITE_ROUTES, WebsiteRouteType } from "@/common/routes";
import { useMusicPlayer } from "@/lib/music-player";
import { cn } from "cn";
import { MusicNavigationIcon } from "@/components/music-navigation-icon";
import { ImageIcon, MessagesSquare } from "lucide-react";
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
  type ComponentType,
  type KeyboardEvent,
  type MouseEvent,
  type TransitionEvent,
} from "react";

type NavigationLink = {
  label: string;
  href: WebsiteRouteType;
  icon?: ComponentType<{ className?: string }>;
  hiddenOnTouch?: boolean;
};
type NavigationGroup = { label: string; items: NavigationLink[] };

const APPS_GROUP_LABEL = "Apps";

const NAVIGATION_ITEMS: (NavigationLink | NavigationGroup)[] = [
  { label: "Writings", href: WEBSITE_ROUTES.WRITINGS },
  {
    label: APPS_GROUP_LABEL,
    items: [
      {
        label: "Music",
        href: WEBSITE_ROUTES.APPS_MUSIC,
        icon: MusicNavigationIcon,
        hiddenOnTouch: true,
      },
      {
        label: "Gallery",
        href: WEBSITE_ROUTES.APPS_GALLERY,
        icon: ImageIcon,
      },
      {
        label: "Discussions",
        href: WEBSITE_ROUTES.APPS_DISCUSSIONS,
        icon: MessagesSquare,
      },
    ],
  },
  { label: "Archive", href: WEBSITE_ROUTES.ARCHIVE },
] as const;

const SOCIAL_LINKS: {
  label: string;
  href: string;
  overrideHoverClassname: string;
}[] = [
  {
    label: "X (Twitter)",
    href: "https://x.com/yashsehgaldev",
    overrideHoverClassname: "hover:bg-muted hover:text-foreground",
  },
  {
    label: "GitHub",
    href: "https://github.com/yashsehgal",
    overrideHoverClassname: "hover:bg-muted hover:text-foreground",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/sehgalyash_/",
    overrideHoverClassname: "hover:bg-muted hover:text-foreground",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sehgalyash/",
    overrideHoverClassname: "hover:bg-muted hover:text-foreground",
  },
  {
    label: "hi@yashsehgal.com",
    href: "mailto:hi@yashsehgal.com",
    overrideHoverClassname: "wide:hover:bg-muted wide:hover:text-foreground",
  },
] as const;

const EMAIL_ADDRESS = "hi@yashsehgal.com";
const DESKTOP_LAYOUT_QUERY = "(width > 64rem)";
const EMAIL_HINT_QUERY =
  "(width > 64rem) and (hover: hover) and (pointer: fine)";
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
    <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded-sm bg-foreground/6 px-1 text-[11px] font-medium leading-none text-foreground shadow-[inset_0_-1px_0_oklch(0_0_0/0.1)] ring-1 ring-foreground/10 dark:bg-white/10 dark:shadow-[inset_0_1px_0_oklch(1_0_0/0.16)] dark:ring-white/10">
      {children}
    </kbd>
  );
}

function EmailShortcutHint({
  id,
  open,
  isMac,
}: {
  id: string;
  open: boolean;
  isMac: boolean;
}) {
  const modifier = isMac ? "⌘" : "Ctrl";
  const modifierName = isMac ? "Command" : "Control";

  return (
    <span
      className={cn(
        "absolute top-full left-0 z-10 hidden pt-2 wide:block",
        !open && "pointer-events-none",
      )}
    >
      <span
        id={id}
        data-open={open}
        className="email-shortcut-hint flex w-max origin-top-left flex-col rounded-lg p-1 text-xs text-foreground"
      >
        <span className="sr-only">
          {`Click to open mail. ${modifierName}-click, or press ${modifierName}-C, to copy the email.`}
        </span>
        <span aria-hidden="true" className="flex flex-col">
          <span className="flex items-center justify-between gap-5 px-2 py-1">
            <span className="font-medium">Open mail</span>
            <KeyCap>Click</KeyCap>
          </span>
          <span className="flex items-center justify-between gap-5 px-2 py-1">
            <span className="font-medium">Copy email</span>
            <span className="inline-flex items-center gap-1">
              <KeyCap>{modifier}</KeyCap>
              <KeyCap>Click</KeyCap>
            </span>
          </span>
        </span>
      </span>
    </span>
  );
}

export function MainSidebarNavigation() {
  const pathname = usePathname();
  const emailHintId = useId();
  const navigationGroupId = useId();
  const isMac = useIsMac();
  const { isPlaying: isMusicPlaying } = useMusicPlayer();
  const [isEmailHovered, setIsEmailHovered] = useState(false);
  const [copyFeedbackPhase, setCopyFeedbackPhase] =
    useState<CopyFeedbackPhase>("idle");
  const [skipCopyFeedbackTransition, setSkipCopyFeedbackTransition] =
    useState(false);
  const copyFeedbackTimerRef = useRef<number | null>(null);
  const emailFocusedRef = useRef(false);

  const isHomePageActive = useMemo(
    () => pathname === WEBSITE_ROUTES.HOME,
    [pathname],
  );

  const isArticlePage =
    pathname.startsWith(`${WEBSITE_ROUTES.WRITINGS}/`) ||
    (pathname.startsWith(`${WEBSITE_ROUTES.APPS_DISCUSSIONS}/`) &&
      pathname !== WEBSITE_ROUTES.APPS_DISCUSSIONS);

  const isNavigationItemActive = useCallback(
    (href: WebsiteRouteType) => {
      return pathname === href || pathname.startsWith(`${href}/`);
    },
    [pathname],
  );

  const activeGroupLabel =
    NAVIGATION_ITEMS.find(
      (item) =>
        "items" in item &&
        item.items.some((link) => isNavigationItemActive(link.href)),
    )?.label ?? null;
  const defaultExpandedGroupLabel = activeGroupLabel;
  const [expandedGroupLabel, setExpandedGroupLabel] = useState(
    defaultExpandedGroupLabel,
  );
  const [previousPathname, setPreviousPathname] = useState(pathname);
  const [
    previousDefaultExpandedGroupLabel,
    setPreviousDefaultExpandedGroupLabel,
  ] = useState(defaultExpandedGroupLabel);

  if (
    pathname !== previousPathname ||
    defaultExpandedGroupLabel !== previousDefaultExpandedGroupLabel
  ) {
    setPreviousPathname(pathname);
    setPreviousDefaultExpandedGroupLabel(defaultExpandedGroupLabel);
    setExpandedGroupLabel(defaultExpandedGroupLabel);
  }

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

  const copyEmailAddress = useCallback(() => {
    void navigator.clipboard.writeText(EMAIL_ADDRESS).then(() => {
      showCopyFeedback();
    });
  }, [showCopyFeedback]);

  const handleEmailClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      if (!window.matchMedia(DESKTOP_LAYOUT_QUERY).matches) {
        return;
      }

      if (!event.metaKey && !event.ctrlKey) {
        return;
      }

      event.preventDefault();
      copyEmailAddress();
    },
    [copyEmailAddress],
  );

  const handleEmailKeyDown = useCallback(
    (event: KeyboardEvent<HTMLAnchorElement>) => {
      if (event.key.toLowerCase() !== "c" || event.altKey || event.shiftKey) {
        return;
      }

      if (!event.metaKey && !event.ctrlKey) {
        return;
      }

      event.preventDefault();
      copyEmailAddress();
    },
    [copyEmailAddress],
  );

  const showEmailHover = useCallback(() => {
    if (!window.matchMedia(EMAIL_HINT_QUERY).matches) {
      return;
    }

    setIsEmailHovered(true);
  }, []);

  const hideEmailHover = useCallback(() => {
    if (emailFocusedRef.current) {
      return;
    }

    setIsEmailHovered(false);
    dismissCopyFeedback();
  }, [dismissCopyFeedback]);

  useEffect(() => {
    const media = window.matchMedia(EMAIL_HINT_QUERY);
    const clearHoverOnNarrowScreens = () => {
      if (media.matches) {
        return;
      }

      setIsEmailHovered(false);
      dismissCopyFeedback();
    };

    media.addEventListener("change", clearHoverOnNarrowScreens);
    return () => media.removeEventListener("change", clearHoverOnNarrowScreens);
  }, [dismissCopyFeedback]);

  const renderNavigationLink = (link: NavigationLink) => (
    <li key={link.href} className={cn(link.hiddenOnTouch && "touch:hidden")}>
      <Link
        href={link.href}
        className={cn(
          "text-sm tracking-tight font-medium select-none rounded px-1 py-0.5",
          isNavigationItemActive(link.href)
            ? "text-foreground bg-muted"
            : "text-muted-foreground hover:bg-muted",
        )}
      >
        {link.icon ? (
          <link.icon className="mr-1 inline-block size-3.5 align-[-0.125em]" />
        ) : null}
        {link.label}
      </Link>
    </li>
  );

  const dimmedClassName = cn(
    "transition-opacity duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none",
    isEmailHovered && "opacity-60",
  );

  return (
    <aside
      className={cn(
        "w-72 max-w-full shrink-0 flex-col items-start gap-4 wide:sticky wide:top-8 wide:flex",
        isArticlePage ? "hidden" : "flex",
      )}
    >
      <header className={cn("px-1", dimmedClassName)}>
        <Link href={WEBSITE_ROUTES.HOME} className="group size-fit block">
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
              className={cn(
                "size-10 select-none dark:invert transition-opacity duration-150 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none",
                isHomePageActive
                  ? "opacity-100"
                  : "opacity-70 [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100 group-focus-visible:opacity-100",
              )}
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
          {NAVIGATION_ITEMS.map((item) => {
            if (!("items" in item)) {
              return renderNavigationLink(item);
            }

            const isExpanded = expandedGroupLabel === item.label;
            const groupListId = `${navigationGroupId}-${item.label}`;
            const nowPlayingLink =
              !isExpanded && isMusicPlaying
                ? item.items.find(
                    (link) => link.href === WEBSITE_ROUTES.APPS_MUSIC,
                  )
                : undefined;

            return (
              <li key={item.label}>
                <button
                  type="button"
                  aria-expanded={isExpanded}
                  aria-controls={groupListId}
                  onClick={() => {
                    setExpandedGroupLabel(isExpanded ? null : item.label);
                  }}
                  className={cn(
                    "-my-0.5 text-sm tracking-tight font-medium select-none rounded px-1 py-0.5 hover:bg-muted",
                    activeGroupLabel === item.label
                      ? "text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {nowPlayingLink ? (
                    <>
                      {nowPlayingLink.icon ? (
                        <nowPlayingLink.icon className="mr-1 inline-block size-3.5 align-[-0.125em]" />
                      ) : null}
                      {item.label}
                      <span
                        aria-hidden="true"
                        className="text-muted-foreground/60"
                      >
                        /
                      </span>
                      <span className="sr-only"> </span>
                      {nowPlayingLink.label}
                    </>
                  ) : (
                    item.label
                  )}
                </button>
                {isExpanded ? (
                  <ul id={groupListId} className="pl-3">
                    {item.items.map(renderNavigationLink)}
                  </ul>
                ) : null}
              </li>
            );
          })}
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
                onMouseEnter={isEmail ? showEmailHover : undefined}
                onMouseLeave={isEmail ? hideEmailHover : undefined}
              >
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href={link.href}
                  aria-describedby={isEmail ? emailHintId : undefined}
                  onClick={isEmail ? handleEmailClick : undefined}
                  onKeyDown={isEmail ? handleEmailKeyDown : undefined}
                  onFocus={
                    isEmail
                      ? () => {
                          emailFocusedRef.current = true;
                          showEmailHover();
                        }
                      : undefined
                  }
                  onBlur={
                    isEmail
                      ? () => {
                          emailFocusedRef.current = false;
                          setIsEmailHovered(false);
                        }
                      : undefined
                  }
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
                              "transition-[translate] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none",
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
                  <EmailShortcutHint
                    id={emailHintId}
                    open={isEmailHovered}
                    isMac={isMac}
                  />
                ) : null}
              </li>
            );
          })}
        </ul>
      </footer>
    </aside>
  );
}
