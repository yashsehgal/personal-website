# 001 — Fix the optical-spacing guideline bars

- **Status**: DONE
- **Commit**: 890cd20
- **Severity**: HIGH
- **Category**: Easing & duration, Performance
- **Estimated scope**: 1 file, three motion elements

## Problem

The guideline bars in the optical-spacing demo enter with `easeIn` and grow by animating `width` or `height`. `ease-in` delays the first frames, which is the moment the reader is watching. `width` and `height` run layout on every frame.

`app/writings/optical-spacing/page.tsx:162-167` — current:

```tsx
<motion.div
  className="guideline-block-horizontal absolute top-[132px] h-6 max-sm:top-[116px]"
  initial={{ width: 0 }}
  animate={{ width: "100%" }}
  transition={{ ease: "easeIn" }}
/>
```

The same `ease: "easeIn"` plus `width` is repeated at `app/writings/optical-spacing/page.tsx:177-182`.

`app/writings/optical-spacing/page.tsx:196-202` — current:

```tsx
<motion.div
  key="show-button-guideline"
  className="guideline-block-vertical absolute top-0 left-[370px] z-0 w-[24px]"
  initial={{ height: 0 }}
  animate={{ height: "360px" }}
  transition={{ ease: "easeIn" }}
/>
```

## Target

Horizontal bars scale on X from the left edge. The vertical bar scales on Y from the top. Duration is 250ms. Easing is the strong ease-out `cubic-bezier(0.23, 1, 0.32, 1)`.

```tsx
<motion.div
  className="guideline-block-horizontal absolute top-[132px] h-6 origin-left max-sm:top-[116px]"
  initial={{ transform: "scaleX(0)" }}
  animate={{ transform: "scaleX(1)" }}
  transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
/>
```

```tsx
<motion.div
  key="show-button-guideline"
  className="guideline-block-vertical absolute top-0 left-[370px] z-0 w-[24px] origin-top"
  initial={{ transform: "scaleY(0)" }}
  animate={{ transform: "scaleY(1)" }}
  transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
/>
```

Apply the same horizontal target to the bar at lines 177–182. Keep its existing `top` and `h-[38px]` classes. Add `origin-left`. Do not change its position values.

## Repo conventions to follow

- This file already uses Framer Motion `motion.div` with `initial`, `animate`, and `transition`. Stay on that API.
- An existing strong ease-out in the repo is `cubic-bezier(0.2, 0, 0, 1)` on `components/layouts/main-sidebar-navigation.tsx:453`. This plan uses the catalog curve `[0.23, 1, 0.32, 1]` instead. Do not add a global CSS token.

## Steps

1. In `app/writings/optical-spacing/page.tsx`, replace the three guideline `motion.div` blocks described above. Do not edit the badge `motion.div` elements in this plan.
2. Confirm no remaining `ease: "easeIn"` and no `width:` or `height:` keys inside those three `initial` / `animate` objects.

## Boundaries

- Do NOT touch the heading blur, the button-group spring, or the spacing badges. Those are other plans.
- Do NOT change the guideline colors, positions, or the toggle button.
- Do NOT add dependencies.
- If the three blocks are no longer at those lines, STOP and report.

## Verification

- **Mechanical**: `pnpm exec tsc --noEmit` exits 0.
- **Feel check**: open `/writings/optical-spacing`, click “Show guidelines”, then the control that separates the buttons. In Chrome DevTools Animations, set playback to 10%. Each bar must start moving immediately and grow from its leading edge, not fade in from the center. Toggling quickly must reverse from the current scale, not jump back to empty and replay.
- **Done when**: the three bars use `transform: scaleX` or `scaleY` and `ease: [0.23, 1, 0.32, 1]` with `duration: 0.25`.
