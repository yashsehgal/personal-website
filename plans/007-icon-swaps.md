# 007 — Scale icon swaps from 0.95, not from a speck

- **Status**: DONE
- **Commit**: 890cd20
- **Severity**: HIGH
- **Category**: Physicality & origin
- **Estimated scope**: 2 files, the shared swap props

## Problem

Play/pause and the copy button crossfade their icons from `scale: 0.25` through a 4px blur. Play/pause is pressed constantly. A 0.25 scale looks like the icon is born from nothing. `filter` also paints on every swap.

`components/music-play-pause-icon.tsx:8-18` — current:

```tsx
export const MUSIC_ICON_TRANSITION = {
  type: "spring" as const,
  duration: 0.3,
  bounce: 0,
};

export const MUSIC_ICON_SWAP = {
  initial: { opacity: 0, scale: 0.25, filter: "blur(4px)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 0.25, filter: "blur(4px)" },
  transition: MUSIC_ICON_TRANSITION,
};
```

`components/copy-icon-button.tsx:14` and `:73-79` — current:

```tsx
const iconTransition = { type: "spring" as const, duration: 0.3, bounce: 0 };
```

```tsx
initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
transition={iconTransition}
```

`components/music-now-playing.tsx:256` exits the whole player with `y: 12` and `filter: "blur(4px)"`, and enters with opacity only (`:254`). That is a separate control. Include it here because it is the same come-from-nothing / blur pattern.

```tsx
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0, y: 12, filter: "blur(4px)" }}
transition={{ duration: 0.22, ease: [0.2, 0, 0, 1] }}
```

## Target

Icon swaps, both files:

```tsx
initial: { opacity: 0, transform: "scale(0.95)" },
animate: { opacity: 1, transform: "scale(1)" },
exit: { opacity: 0, transform: "scale(0.95)" },
transition: { duration: 0.16, ease: [0.23, 1, 0.32, 1] },
```

For `copy-icon-button.tsx`, keep `iconTransition` as that transition object (no `type: "spring"`). For `MUSIC_ICON_TRANSITION`, replace the spring with `{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }`. Drop `filter` from initial, animate, and exit.

Now-playing section:

```tsx
initial={{ opacity: 0, transform: "translateY(8px)" }}
animate={{ opacity: 1, transform: "translateY(0px)" }}
exit={{ opacity: 0, transform: "translateY(8px)" }}
transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
```

## Repo conventions to follow

- `copy-icon-button.tsx` already wraps the swap in `<MotionConfig reducedMotion="user">`. Do not remove it.
- `MusicPlayPauseIcon` spreads `MUSIC_ICON_SWAP`. Keep that spread. Callers in `components/music-now-playing.tsx` and `components/music-track-list.tsx` must not be edited except the section enter/exit in `music-now-playing.tsx` listed above.

## Steps

1. Replace `MUSIC_ICON_TRANSITION` and `MUSIC_ICON_SWAP` in `components/music-play-pause-icon.tsx`.
2. Replace `iconTransition` and the three motion props in `components/copy-icon-button.tsx`.
3. Replace the now-playing `motion.section` initial, animate, exit, and transition in `components/music-now-playing.tsx`.

## Boundaries

- Do NOT change `GooeySurface`, the volume tooltip, or the expanded-panel `grid-template-rows` transition.
- Do NOT add dependencies.
- If `MUSIC_ICON_SWAP` is no longer spread onto the icon, STOP and report.

## Verification

- **Mechanical**: `pnpm exec tsc --noEmit` exits 0.
- **Feel check**: open `/apps/music` and press play, then pause, several times. The icon must stay nearly full size and only fade. It must not blur or shrink to a dot. Copy a link on an article and watch the checkmark the same way. Dismiss the player if the UI allows, or change tracks so the section exits: it should move 8px and fade, with no blur. Emulate reduced motion and confirm the copy button stops scaling.
- **Done when**: `scale: 0.25` and `blur(4px)` are gone from these three files’ motion props.
