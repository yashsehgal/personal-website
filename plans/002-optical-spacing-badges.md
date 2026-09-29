# 002 — Stop the optical-spacing badges appearing from nothing

- **Status**: DONE
- **Commit**: 890cd20
- **Severity**: HIGH
- **Category**: Physicality & origin
- **Estimated scope**: 1 file, three badges

## Problem

The pixel badges enter from `scale: 0`. Nothing in the interface should appear from a point. The default Framer transition also has no explicit ease, so the entrance is a weak curve after a long delay (0.4s, 0.5s, 0.8s).

`app/writings/optical-spacing/page.tsx:168-176` — current:

```tsx
<motion.div
  key="badge-between-title-description"
  className="absolute top-[131px] right-24 w-fit scale-90 rounded-lg border border-red-400 bg-red-50 px-1.5 py-1 font-mono text-xs font-medium text-red-500 max-sm:top-[116px] dark:border-red-900 dark:bg-red-950 dark:text-red-200"
  initial={{ opacity: 0, scale: 0 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ delay: 0.5 }}
>
  16px
</motion.div>
```

The same `initial={{ opacity: 0, scale: 0 }}` is at `app/writings/optical-spacing/page.tsx:183-192` (`delay: 0.8`, label `24px`) and `app/writings/optical-spacing/page.tsx:203-211` (`delay: 0.4`, label `16px`).

## Target

Start at `scale(0.95)` with opacity 0. End at `scale(1)` with opacity 1. Duration 200ms. Ease `[0.23, 1, 0.32, 1]`. Delays become 0.2, 0.28, and 0.16 so the badge arrives as the bar finishes, not half a second later.

```tsx
initial={{ opacity: 0, transform: "scale(0.95)" }}
animate={{ opacity: 1, transform: "scale(1)" }}
transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
```

Use `delay: 0.2` for the first 16px badge, `delay: 0.28` for the 24px badge, and `delay: 0.16` for the button-gap 16px badge. Keep each badge’s existing `className` and `key`.

## Repo conventions to follow

- Stay on `motion.div` in `app/writings/optical-spacing/page.tsx`.
- Do not introduce a CSS variable. Inline the curve `[0.23, 1, 0.32, 1]`.

## Steps

1. Replace `initial`, `animate`, and `transition` on the three badge `motion.div` elements only.
2. Remove every `scale: 0` from this file.

## Boundaries

- Do NOT edit the guideline bars or the hero button group.
- Do NOT change badge copy, colors, or positions.
- Do NOT add dependencies.
- If a badge no longer uses `scale: 0`, STOP and report.

## Verification

- **Mechanical**: `pnpm exec tsc --noEmit` exits 0.
- **Feel check**: open `/writings/optical-spacing` and show the guidelines. At 10% playback, each badge must already have a visible size on the first frame and fade in. It must not pop out of a dot.
- **Done when**: the three badges use `transform: "scale(0.95)"` to `transform: "scale(1)"` and the ease array above.
