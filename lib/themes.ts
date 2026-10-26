export const THEME_STORAGE_KEY = "ys-theme";

export const themes = [
  {
    name: "default",
    bg: "#ffffff",
    fg: "#000000",
    muted: "#757575",
    scheme: "light",
  },
  {
    name: "dark blue",
    bg: "#1e3a8a",
    fg: "#ffffff",
    muted: "#a1acce",
    scheme: "dark",
  },
  {
    name: "jade",
    bg: "#064e3b",
    fg: "#a7f3d0",
    muted: "#77c2a3",
    scheme: "dark",
  },
  {
    name: "pink",
    bg: "#fce7f3",
    fg: "#9d174d",
    muted: "#b14370",
    scheme: "light",
  },
  {
    name: "green",
    bg: "#22c55e",
    fg: "#000000",
    muted: "#0d4923",
    scheme: "light",
  },
  {
    name: "yellow",
    bg: "#facc15",
    fg: "#9a3412",
    muted: "#9c3712",
    scheme: "light",
  },
] as const;

export type Theme = (typeof themes)[number];

export function applyTheme(index: number) {
  const theme = themes[index];

  if (!theme || typeof document === "undefined") {
    return;
  }

  const root = document.documentElement;
  root.dataset.theme = String(index);
  root.style.setProperty("--page-bg", theme.bg);
  root.style.setProperty("--page-fg", theme.fg);
  root.style.setProperty("--page-muted", theme.muted);
  root.style.colorScheme = theme.scheme;
}

export function themeBootstrapScript() {
  return `(function(){try{var t=${JSON.stringify(
    themes.map(({ bg, fg, muted, scheme }) => ({ bg, fg, muted, scheme })),
  )};var i=localStorage.getItem(${JSON.stringify(
    THEME_STORAGE_KEY,
  )});if(i==null)return;var n=Number(i);if(!t[n])return;var x=t[n];var r=document.documentElement;r.dataset.theme=String(n);r.style.setProperty("--page-bg",x.bg);r.style.setProperty("--page-fg",x.fg);r.style.setProperty("--page-muted",x.muted);r.style.colorScheme=x.scheme;}catch(e){}})();`;
}
