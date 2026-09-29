# 004 — Keep the navigation demo from scaling out of a point

- **Status**: DONE
- **Commit**: 890cd20
- **Severity**: HIGH
- **Category**: Physicality & origin
- **Estimated scope**: 1 file, the backtracking preview scene map and its MotionConfig

## Problem

The backtracking preview shares `{ type: "spring", bounce: 0 }` with no duration, so scenes can settle for longer than a UI animation should. The folder enters at `scale: 0.3`. The URL path exits toward `scale: 0.4`. Both read as coming from nothing.

`app/writings/navigation-using-query-states/page.tsx:442` — current:

```tsx
<MotionConfig transition={{ type: 'spring', bounce: 0 }}>
```

`app/writings/navigation-using-query-states/page.tsx:364` — current:

```tsx
animate: { opacity: 0, scale: 0.4 },
```

`app/writings/navigation-using-query-states/page.tsx:377-388` — current, repeated for three states:

```tsx
animate: { opacity: 0, scale: 0.3, y: 56 },
```

`app/writings/navigation-using-query-states/page.tsx:472-476` — current:

```tsx
<motion.div
  key="folder-container"
  className="border border-foreground/10 absolute bottom-0 left-1/2 -translate-x-1/2 rounded-3xl p-2 bg-foreground/2"
  initial={{ opacity: 0, scale: 0.3, y: 56 }}
  animate={SCENE_ANIMATIONS['show-folder'][scene]?.animate}>
```

The composed camera moves at `scale: 0.6` (`page.tsx:346` and `:350`) are the scene’s zoom, not an entrance. Leave those numbers alone.

## Target

Shared transition:

```tsx
<MotionConfig transition={{ type: "spring", duration: 0.5, bounce: 0 }}>
```

Path exit at the `ZOOM_SEGMENTS` entry that is currently `{ opacity: 0, scale: 0.4 }`:

```tsx
animate: { opacity: 0, transform: "scale(0.95)" },
```

Each `show-folder` state that is currently `{ opacity: 0, scale: 0.3, y: 56 }`:

```tsx
animate: { opacity: 0, transform: "translateY(8px) scale(0.95)" },
```

Folder element initial:

```tsx
initial={{ opacity: 0, transform: "translateY(8px) scale(0.95)" }}
```

Do not change states whose `animate` is `{ opacity: 1, scale: 1.2, ... }` or `{ y: -120, scale: 0.6, x: -85 }`.

## Repo conventions to follow

- This preview already uses `SCENE_ANIMATIONS` and `MotionConfig`. Keep that structure.
- Quote style in this file is single quotes. Match it.

## Steps

1. Replace the `MotionConfig` transition prop.
2. Replace the three hidden `show-folder` animate objects and the folder `initial` prop.
3. Replace the `scale: 0.4` path exit.
4. Search this file for `scale: 0.3` and `scale: 0.4`. The only remaining small scale should be none.

## Boundaries

- Do NOT change the tree-node chevron, the `transition-[padding]` class, or the `height: 0` expand. Those are other plans.
- Do NOT change the `scale: 0.6` camera moves.
- Do NOT add dependencies.
- If `SCENE_ANIMATIONS` keys differ, STOP and report.

## Verification

- **Mechanical**: `pnpm exec tsc --noEmit` exits 0.
- **Feel check**: open `/writings/navigation-using-query-states`, scroll to the backtracking preview, and let it play. At 10% playback the folder must enter already near full size. The URL fragment must fade while staying almost full size, not shrink to a speck.
- **Done when**: `bounce: 0` springs in this preview set `duration: 0.5`, and `scale: 0.3` / `scale: 0.4` are gone.
