import type React from "react";

const contentMarks = [
  {
    d: "M0 4 C 12 0, 24 7, 42 2 C 58 0, 72 6, 88 3 C 95 2, 100 5, 100 4 L 100 20 C 84 23, 66 17, 48 22 C 30 24, 14 18, 0 21 Z",
    y: "-0.2em",
    h: "1.36em",
    pad: "0.08em",
    duration: "200ms",
    opacity: 1,
  },
  {
    d: "M0 3 C 16 7, 28 0, 46 4 C 62 8, 76 1, 92 5 C 97 6, 100 3, 100 4 L 100 21 C 82 24, 64 18, 44 22 C 26 19, 12 23, 0 17 Z",
    y: "-0.24em",
    h: "1.42em",
    pad: "0.14em",
    duration: "230ms",
    opacity: 1,
  },
  {
    d: "M0 4 C 14 1, 26 8, 44 3 C 60 0, 74 7, 90 3 C 96 2, 100 5, 100 4 L 100 20 C 86 23, 68 18, 50 22 C 32 24, 16 19, 0 20 Z",
    y: "-0.16em",
    h: "1.32em",
    pad: "0.04em",
    duration: "180ms",
    opacity: 1,
  },
  {
    d: "M0 5 C 10 0, 22 8, 40 2 C 56 0, 70 7, 86 3 C 94 2, 100 6, 100 3 L 100 20 C 88 24, 70 17, 52 22 C 32 24, 14 19, 0 21 Z",
    y: "-0.22em",
    h: "1.4em",
    pad: "0.18em",
    duration: "220ms",
    opacity: 1,
  },
  {
    d: "M0 3 C 18 7, 32 0, 50 4 C 66 8, 80 1, 94 4 C 98 5, 100 2, 100 3 L 100 21 C 80 24, 62 18, 42 22 C 24 19, 10 23, 0 16 Z",
    y: "-0.18em",
    h: "1.34em",
    pad: "0.1em",
    duration: "190ms",
    opacity: 1,
  },
  {
    d: "M0 3 C 12 0, 24 7, 42 2 C 58 0, 72 6, 88 3 C 95 2, 100 5, 100 4 L 100 20 C 88 23, 70 18, 52 22 C 34 24, 16 19, 0 21 Z",
    y: "-0.22em",
    h: "1.4em",
    pad: "0.2em",
    duration: "210ms",
    opacity: 1,
  },
  {
    d: "M0 5 C 14 1, 28 8, 46 3 C 62 0, 76 7, 92 4 C 97 3, 100 6, 100 5 L 100 19 C 84 23, 64 17, 44 22 C 26 24, 12 18, 0 20 Z",
    y: "-0.2em",
    h: "1.36em",
    pad: "0.06em",
    duration: "240ms",
    opacity: 1,
  },
  {
    d: "M0 4 C 16 1, 30 8, 48 3 C 64 0, 78 7, 94 4 C 98 3, 100 6, 100 5 L 100 20 C 82 24, 64 18, 46 22 C 28 24, 12 19, 0 21 Z",
    y: "-0.24em",
    h: "1.42em",
    pad: "0.12em",
    duration: "170ms",
    opacity: 1,
  },
  {
    d: "M0 2 C 14 6, 28 0, 46 4 C 62 8, 76 1, 92 5 C 97 6, 100 3, 100 4 L 100 21 C 86 18, 68 23, 50 19 C 32 16, 14 22, 0 18 Z",
    y: "-0.26em",
    h: "1.44em",
    pad: "0.16em",
    duration: "200ms",
    opacity: 1,
  },
  {
    d: "M0 4 C 14 1, 28 7, 46 3 C 64 0, 78 6, 94 4 C 98 3, 100 5, 100 5 L 100 19 C 84 22, 66 17, 48 21 C 30 23, 14 18, 0 20 Z",
    y: "-0.22em",
    h: "1.38em",
    pad: "0.05em",
    duration: "220ms",
    opacity: 1,
  },
] as const;

function markImage(d: string, opacity: number) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 24" preserveAspectRatio="none"><path fill="#e2e2e2" fill-opacity="${opacity}" d="${d}"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

function markStyle(mark: number) {
  const stroke = contentMarks[mark];

  return {
    "--mark-image": markImage(stroke.d, stroke.opacity),
    "--mark-y": stroke.y,
    "--mark-h": stroke.h,
    "--mark-pad": stroke.pad,
    "--mark-duration": stroke.duration,
  };
}

export function ContentLink({
  href,
  children,
  mark,
  external = true,
}: {
  href: string;
  children: React.ReactNode;
  mark: number;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      className="content-link"
      style={markStyle(mark)}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : undefined)}
    >
      {children}
    </a>
  );
}
