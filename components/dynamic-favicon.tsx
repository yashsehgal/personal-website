"use client";

import { useEffect } from "react";

const INTERVAL_MS = 4000;
const INITIALS_HREF = "/assets/initials.svg";

const FAVICON_COLORS = {
  blue: "#2563eb",
  orange: "#f97316",
  pink: "#ec4899",
  yellow: "#eab308",
  white: "#fafafa",
  black: "#0a0a0a",
} as const;

const LIGHT_CYCLE = [
  FAVICON_COLORS.black,
  FAVICON_COLORS.blue,
  FAVICON_COLORS.orange,
  FAVICON_COLORS.pink,
  FAVICON_COLORS.yellow,
] as const;

const DARK_CYCLE = [
  FAVICON_COLORS.white,
  FAVICON_COLORS.blue,
  FAVICON_COLORS.orange,
  FAVICON_COLORS.pink,
  FAVICON_COLORS.yellow,
] as const;

let initialsSvg: Promise<string> | null = null;
const hrefCache = new Map<string, string>();

function loadInitialsSvg() {
  initialsSvg ??= fetch(INITIALS_HREF).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to load favicon SVG (${response.status})`);
    }

    return response.text();
  });

  return initialsSvg;
}

const FAVICON_VIEWBOX = "12 -7 144 144";

function getColoredHref(svg: string, color: string) {
  const cached = hrefCache.get(color);

  if (cached) {
    return cached;
  }

  const colored = svg
    .replaceAll(/fill="(?:black|#0a0a0a|#000000)"/gi, `fill="${color}"`)
    .replace(/viewBox="[^"]*"/, `viewBox="${FAVICON_VIEWBOX}"`)
    .replace(/\s(?:width|height)="[^"]*"/g, "")
    .replace(/<svg\b/, `<svg width="32" height="32"`)
    .replace(/\sclip-path="url\([^)]+\)"/, "")
    .replace(/<clipPath[\s\S]*?<\/clipPath>/, "");
  const href = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(colored)}`;
  hrefCache.set(color, href);
  return href;
}

function getIconLink() {
  const existing = document.querySelector<HTMLLinkElement>('link[rel="icon"]');

  if (existing) {
    return existing;
  }

  const link = document.createElement("link");
  link.rel = "icon";
  link.type = "image/svg+xml";
  document.head.append(link);
  return link;
}

function getCycle(isDark: boolean, reduceMotion: boolean) {
  if (reduceMotion) {
    return [isDark ? FAVICON_COLORS.white : FAVICON_COLORS.black] as const;
  }

  return isDark ? DARK_CYCLE : LIGHT_CYCLE;
}

export function DynamicFavicon() {
  useEffect(() => {
    let cancelled = false;
    let intervalId = 0;
    let index = 0;

    const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const apply = async (color: string) => {
      const svg = await loadInitialsSvg();

      if (cancelled) {
        return;
      }

      const link = getIconLink();
      link.type = "image/svg+xml";
      link.href = getColoredHref(svg, color);
    };

    const start = () => {
      window.clearInterval(intervalId);
      const cycle = getCycle(colorScheme.matches, reducedMotion.matches);
      index = 0;
      void apply(cycle[0]);

      if (cycle.length === 1 || document.hidden) {
        return;
      }

      intervalId = window.setInterval(() => {
        index = (index + 1) % cycle.length;
        void apply(cycle[index]);
      }, INTERVAL_MS);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        window.clearInterval(intervalId);
        return;
      }

      start();
    };

    start();
    colorScheme.addEventListener("change", start);
    reducedMotion.addEventListener("change", start);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
      colorScheme.removeEventListener("change", start);
      reducedMotion.removeEventListener("change", start);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return null;
}
