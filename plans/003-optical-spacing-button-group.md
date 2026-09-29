# 003 — Move the optical-spacing button group on the transform string

- **Status**: DONE
- **Commit**: 890cd20
- **Severity**: HIGH
- **Category**: Performance
- **Estimated scope**: 1 file, one motion element

## Problem

The hero buttons move with Framer Motion’s `scale`, `x`, and `y` shorthands. Those run on the main thread. The `ease: "easeInOut"` on the same object is ignored because `type: "spring"` wins, so the declared ease does nothing.

`app/writings/optical-spacing/page.tsx:142-151` — current:

```tsx
<motion.div
  key="hero-section-buttons-container"
  className="flex items-center justify-start gap-4"
  animate={{
    scale: reduceOpacity ? 1.5 : undefined,
    y: reduceOpacity ? -80 : undefined,
    x: reduceOpacity ? 210 : undefined,
  }}
  transition={{ bounce: 0.2, type: "spring", ease: "easeInOut" }}
>
```

## Target

One transform string. Spring is `{ type: "spring", duration: 0.5, bounce: 0.2 }`. No `ease` key.

```tsx
<motion.div
  key="hero-section-buttons-container"
  className="flex items-center justify-start gap-4"
  animate={{
    transform: reduceOpacity
      ? "translate3d(210px, -80px, 0) scale(1.5)"
      : "translate3d(0px, 0px, 0) scale(1)",
  }}
  transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
>
```

Keep the existing children and `key`.

## Repo conventions to follow

- This demo already uses Framer Motion. Do not switch it to CSS.
- Press feedback elsewhere is `active:scale-[0.97]` in `components/ui/button.tsx`. Do not add press feedback to these demo buttons in this plan.

## Steps

1. Replace the `animate` and `transition` props on `hero-section-buttons-container` with the target above.
2. Leave `reduceOpacity` and the two `<button>` elements unchanged.

## Boundaries

- Do NOT edit guideline bars, badges, or the blur on the heading and paragraph.
- Do NOT add dependencies.
- If `reduceOpacity` is gone, STOP and report.

## Verification

- **Mechanical**: `pnpm exec tsc --noEmit` exits 0.
- **Feel check**: open `/writings/optical-spacing` and toggle the state that sets `reduceOpacity`. The buttons must slide and grow as one piece. In the Performance panel, the animation should not show Layout events on that div. Interrupting the toggle mid-way must reverse from the current transform.
- **Done when**: the element animates only `transform`, and the transition is exactly `{ type: "spring", duration: 0.5, bounce: 0.2 }`.
