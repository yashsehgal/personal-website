import type React from "react";

// Each mark masks the link, text included, so its wavy edges have to stay
// clear of the glyphs. y and h are measured from the top of the link's text
// box: the solid middle of every path spans 0.2em to 1.23em, which covers
// Inter from ascenders to descenders, and only the shallow waves sit outside.
const contentMarks = [
  {
    d: "M0 2 C 12 0, 24 3.5, 42 1 C 58 0, 72 3, 88 1.5 C 95 1, 100 2.5, 100 2 L 100 22 C 84 23.5, 66 20.5, 48 23 C 30 24, 14 21, 0 22.5 Z",
    y: "-0.01em",
    h: "1.45em",
    pad: "0.08em",
    duration: "200ms",
    opacity: 1,
  },
  {
    d: "M0 1.5 C 16 3.5, 28 0, 46 2 C 62 4, 76 0.5, 92 2.5 C 97 3, 100 1.5, 100 2 L 100 22.5 C 82 24, 64 21, 44 23 C 26 21.5, 12 23.5, 0 20.5 Z",
    y: "-0.05em",
    h: "1.5em",
    pad: "0.14em",
    duration: "230ms",
    opacity: 1,
  },
  {
    d: "M0 2 C 14 0.5, 26 4, 44 1.5 C 60 0, 74 3.5, 90 1.5 C 96 1, 100 2.5, 100 2 L 100 22 C 86 23.5, 68 21, 50 23 C 32 24, 16 21.5, 0 22 Z",
    y: "-0.04em",
    h: "1.45em",
    pad: "0.04em",
    duration: "180ms",
    opacity: 1,
  },
  {
    d: "M0 2.5 C 10 0, 22 4, 40 1 C 56 0, 70 3.5, 86 1.5 C 94 1, 100 3, 100 1.5 L 100 22 C 88 24, 70 20.5, 52 23 C 32 24, 14 21.5, 0 22.5 Z",
    y: "-0.05em",
    h: "1.5em",
    pad: "0.18em",
    duration: "220ms",
    opacity: 1,
  },
  {
    d: "M0 1.5 C 18 3.5, 32 0, 50 2 C 66 4, 80 0.5, 94 2 C 98 2.5, 100 1, 100 1.5 L 100 22.5 C 80 24, 62 21, 42 23 C 24 21.5, 10 23.5, 0 20 Z",
    y: "-0.06em",
    h: "1.55em",
    pad: "0.1em",
    duration: "190ms",
    opacity: 1,
  },
  {
    d: "M0 1.5 C 12 0, 24 3.5, 42 1 C 58 0, 72 3, 88 1.5 C 95 1, 100 2.5, 100 2 L 100 22 C 88 23.5, 70 21, 52 23 C 34 24, 16 21.5, 0 22.5 Z",
    y: "-0.01em",
    h: "1.41em",
    pad: "0.2em",
    duration: "210ms",
    opacity: 1,
  },
  {
    d: "M0 2.5 C 14 0.5, 28 4, 46 1.5 C 62 0, 76 3.5, 92 2 C 97 1.5, 100 3, 100 2.5 L 100 21.5 C 84 23.5, 64 20.5, 44 23 C 26 24, 12 21, 0 22 Z",
    y: "-0.05em",
    h: "1.5em",
    pad: "0.06em",
    duration: "240ms",
    opacity: 1,
  },
  {
    d: "M0 2 C 16 0.5, 30 4, 48 1.5 C 64 0, 78 3.5, 94 2 C 98 1.5, 100 3, 100 2.5 L 100 22 C 82 24, 64 21, 46 23 C 28 24, 12 21.5, 0 22.5 Z",
    y: "-0.04em",
    h: "1.45em",
    pad: "0.12em",
    duration: "170ms",
    opacity: 1,
  },
  {
    d: "M0 1 C 14 3, 28 0, 46 2 C 62 4, 76 0.5, 92 2.5 C 97 3, 100 1.5, 100 2 L 100 22.5 C 86 21, 68 23.5, 50 21.5 C 32 20, 14 23, 0 21 Z",
    y: "-0.06em",
    h: "1.55em",
    pad: "0.16em",
    duration: "200ms",
    opacity: 1,
  },
  {
    d: "M0 2 C 14 0.5, 28 3.5, 46 1.5 C 64 0, 78 3, 94 2 C 98 1.5, 100 2.5, 100 2.5 L 100 21.5 C 84 23, 66 20.5, 48 22.5 C 30 23.5, 14 21, 0 22 Z",
    y: "-0.01em",
    h: "1.45em",
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
