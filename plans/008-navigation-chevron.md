# 008 — Give the demo chevron a strong ease-out

- **Status**: DONE
- **Commit**: 890cd20
- **Severity**: LOW
- **Category**: Easing & duration
- **Estimated scope**: 1 file, one class string

## Problem

The folder chevron in the navigation essay rotates and changes color with the built-in CSS `ease-out`. That curve is too weak for a deliberate 150ms move. Hover color would ideally use `ease`, but this element also rotates, and one strong ease-out is the cohesive choice at this size.

`app/writings/navigation-using-query-states/page.tsx:858` — current:

```tsx
'text-foreground/50 shrink-0 transition-[color,transform] duration-150 ease-out group-hover/tree-node:text-foreground',
```

## Target

```tsx
'text-foreground/50 shrink-0 transition-[color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none group-hover/tree-node:text-foreground',
```

Keep `rotate-90` / `rotate-0` on the following line.

## Repo conventions to follow

- Single quotes in this file.
- `motion-reduce:transition-none` is the site pattern, from `components/layouts/main-sidebar-navigation.tsx:453`.

## Steps

1. Replace the chevron `className` string at the cited line with the target. Do not change the `rotate` classes.

## Boundaries

- Do NOT edit `SCENE_ANIMATIONS`, the tree height, or padding.
- Do NOT add dependencies.
- If that class no longer contains `ease-out`, STOP and report.

## Verification

- **Mechanical**: `pnpm exec tsc --noEmit` exits 0.
- **Feel check**: in the navigation essay’s live sidebar preview, open and close a folder. The chevron should start turning immediately. Emulate reduced motion and confirm it snaps to the new angle.
- **Done when**: the class uses `ease-[cubic-bezier(0.23,1,0.32,1)]` and `motion-reduce:transition-none`.
