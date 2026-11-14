"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Each link's mark, drawn in the link's colour and sized in em so it scales
// with the 14px label. Both sit on the text baseline and are optically
// matched to Inter's 0.727em cap height: a point reads shorter than a flat
// edge, so the triangle stands a hair taller (0.75em), while a solid square
// reads heavier, so it sits a hair shorter (0.68em).
const icons = {
  square: {
    viewBox: "0 0 1 1",
    d: "M0 0 H1 V1 H0 Z",
    width: "0.68em",
    height: "0.68em",
  },
  triangle: {
    viewBox: "0 0 10 9",
    d: "M0 9 L5 0 L10 9 Z",
    width: "0.8333em",
    height: "0.75em",
  },
} as const;

const links = [
  { label: "Writings", href: "/writings", icon: "square" },
  { label: "Archives", href: "/archives", icon: "triangle" },
] as const;

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="site-nav" aria-label="Main">
      <ul>
        {links.map((link) => {
          const current =
            pathname === link.href || pathname.startsWith(`${link.href}/`);
          const icon = icons[link.icon];

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={current ? "page" : undefined}
              >
                <svg
                  viewBox={icon.viewBox}
                  style={{ width: icon.width, height: icon.height }}
                  aria-hidden="true"
                >
                  <path d={icon.d} fill="currentColor" />
                </svg>
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
