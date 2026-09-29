# 005 — Stop the navigation demo animating padding and height

- **Status**: DONE
- **Commit**: 890cd20
- **Severity**: MEDIUM
- **Category**: Performance
- **Estimated scope**: 1 file, two motion sites

## Problem

The highlighted path adds padding with a CSS transition, which runs layout. The sidebar tree expands by tweening `height` from `0` to `fit-content` over a 500ms spring. Both are off the GPU, and the tree is reversible, so a height spring restarts instead of retargeting cleanly.

`app/writings/navigation-using-query-states/page.tsx:459-467` — current:

```tsx
<motion.div
  key="segments-container"
  className={cn(
    'transition-[padding] w-fit flex items-center',
    !validateActiveScene(
      BACKTRACKING_PREVIEW_STATE.SHOW_URL_IN_BROWSER,
    ) &&
      'px-3 py-1 rounded-xl border border-blue-300 bg-blue-50 text-blue-400 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-600',
  )}>
```

`app/writings/navigation-using-query-states/page.tsx:793-800` — current:

```tsx
<motion.div
  key={node.id}
  className="dashboard-sidebar-tree-node-children-items-container overflow-hidden"
  initial={{ height: 0 }}
  animate={{ height: 'fit-content' }}
  exit={{ height: 0 }}
  transition={{ duration: 0.5, type: 'spring', bounce: 0 }}>
```

## Target

Delete `transition-[padding]`. The highlight class may still set `px-3 py-1`. The padding appears immediately.

Replace the height tween with opacity and a 4px translate. Duration 200ms. Ease `[0.23, 1, 0.32, 1]`. Keep `overflow-hidden`.

```tsx
<motion.div
  key={node.id}
  className="dashboard-sidebar-tree-node-children-items-container overflow-hidden"
  initial={{ opacity: 0, transform: "translateY(-4px)" }}
  animate={{ opacity: 1, transform: "translateY(0px)" }}
  exit={{ opacity: 0, transform: "translateY(-4px)" }}
  transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
>
```

## Repo conventions to follow

- Single quotes in this file.
- Reduced motion is not wired on this demo today. Do not add a new hook. The 200ms opacity change is the whole motion.

## Steps

1. Remove the string `transition-[padding]` from the segments container `className`. Leave the conditional highlight classes.
2. Replace the children `motion.div` initial, animate, exit, and transition as targeted.

## Boundaries

- Do NOT edit `SCENE_ANIMATIONS`, `MotionConfig`, or the chevron class.
- Do NOT add `AnimatePresence` if it is not already wrapping this node. If exit never plays because there is no `AnimatePresence`, still set `exit` as specified and do not wrap new parents.
- Do NOT add dependencies.
- If the height props are already gone, STOP and report.

## Verification

- **Mechanical**: `pnpm exec tsc --noEmit` exits 0.
- **Feel check**: in the navigation essay, play the backtracking preview and open a folder in the sidebar preview. The blue path highlight must not slide its text sideways as padding grows. The folder children must fade and move 4px, and the Animations panel must not list a height animation. Open and close a folder quickly: the fade must reverse from the current opacity.
- **Done when**: `transition-[padding]` and `height: 0` / `height: 'fit-content'` are gone from this file.
