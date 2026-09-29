# 006 — Quiet the sidebar email dim and copy slide

- **Status**: DONE
- **Commit**: 890cd20
- **Severity**: MEDIUM
- **Category**: Performance, Easing & duration
- **Estimated scope**: 1 file, two class strings

## Problem

Hovering the email blurs the whole sidebar header. `filter` is paint work on a control used many times a day. The “copied” label then slides in 300ms. A one-line text swap is a small popover and should finish in 125–200ms.

`components/layouts/main-sidebar-navigation.tsx:292-295` — current:

```tsx
const dimmedClassName = cn(
  "transition-[opacity,filter] duration-150 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none",
  isEmailHovered && "opacity-60 blur-xs",
);
```

`components/layouts/main-sidebar-navigation.tsx:450-456` — current:

```tsx
className={cn(
  "flex flex-col",
  !skipCopyFeedbackTransition &&
    "transition-[translate] duration-300 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none",
  copyFeedbackPhase === "copied" && "-translate-y-5",
  copyFeedbackPhase === "done" && "-translate-y-10",
)}
```

The hint at line 479 is already 200ms on opacity and translate, with reduced motion. Leave it.

## Target

Dim with opacity only:

```tsx
const dimmedClassName = cn(
  "transition-opacity duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none",
  isEmailHovered && "opacity-60",
);
```

Copy slide:

```tsx
"transition-[translate] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none"
```

Keep the translate class conditions (`-translate-y-5`, `-translate-y-10`) and `skipCopyFeedbackTransition`.

## Repo conventions to follow

- This sidebar already gates movement with `motion-reduce:transition-none`. Keep that class on both strings.
- Do not add a global easing token.

## Steps

1. Replace `dimmedClassName` so it transitions opacity only and no longer applies `blur-xs`.
2. Change the copy-feedback transition class from `duration-300` and `cubic-bezier(0.2, 0, 0, 1)` to `duration-200` and `cubic-bezier(0.23, 1, 0.32, 1)`.

## Boundaries

- Do NOT change when `isEmailHovered` or `copyFeedbackPhase` is set.
- Do NOT edit the email hint block at line 479.
- Do NOT add dependencies.
- If `dimmedClassName` no longer includes `blur-xs`, STOP and report.

## Verification

- **Mechanical**: `pnpm exec tsc --noEmit` exits 0.
- **Feel check**: on the home page, hover the email. The name and mark above it should fade to 60% opacity and stay sharp. Click to copy. The word “copied” should finish its slide in about a fifth of a second. In Rendering, emulate `prefers-reduced-motion: reduce` and confirm both the fade and the slide stop moving.
- **Done when**: `blur-xs` is gone from this file and the copy transition is `duration-200` with `cubic-bezier(0.23, 1, 0.32, 1)`.
