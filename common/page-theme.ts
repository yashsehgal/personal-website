import { ROUTES } from "@/common/routes";

export const PAGE_THEME_MATCHES = [
  { path: ROUTES.ABOUT, theme: "about" },
  { path: ROUTES.WORK, theme: "work" },
  { path: ROUTES.WRITINGS, theme: "writings" },
  { path: ROUTES.PHOTOS, theme: "photos" },
] as const;

export type PageTheme = (typeof PAGE_THEME_MATCHES)[number]["theme"];

export function getPageTheme(pathname: string): PageTheme | null {
  for (const { path, theme } of PAGE_THEME_MATCHES) {
    if (pathname === path || pathname.startsWith(`${path}/`)) {
      return theme;
    }
  }

  return null;
}

export const PAGE_THEME_BOOTSTRAP_SCRIPT = `(function(){
  var p = location.pathname;
  var t = "";
  ${PAGE_THEME_MATCHES.map(
    ({ path, theme }, index) =>
      `${index === 0 ? "if" : "else if"} (p === "${path}" || p.indexOf("${path}/") === 0) t = "${theme}";`,
  ).join("\n  ")}
  if (t) document.documentElement.setAttribute("data-theme", t);
  else document.documentElement.removeAttribute("data-theme");
})();`;
