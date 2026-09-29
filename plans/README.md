# Animation plans

Written against commit `890cd20`. Executors have no other context. Follow each plan exactly. If the cited code has drifted, stop and report.

The site is a quiet personal pageset. List hovers on the home page, writings index, and archive are instant on purpose. Do not add transitions to those links.

## Order

| Plan | Title | Severity | Status | Depends on |
| --- | --- | --- | --- | --- |
| 001 | Fix the optical-spacing guideline bars | HIGH | DONE | none |
| 002 | Stop the optical-spacing badges appearing from nothing | HIGH | DONE | none |
| 003 | Move the optical-spacing button group on the transform string | HIGH | DONE | none |
| 004 | Keep the navigation demo from scaling out of a point | HIGH | DONE | none |
| 005 | Stop the navigation demo animating padding and height | MEDIUM | DONE | none |
| 007 | Scale icon swaps from 0.95, not from a speck | HIGH | DONE | none |
| 006 | Quiet the sidebar email dim and copy slide | MEDIUM | DONE | none |
| 008 | Give the demo chevron a strong ease-out | LOW | DONE | 005, so the navigation file is not edited in parallel |

001, 002, and 003 touch the same file. Run them in that order, one at a time. 004 and 005 touch the navigation essay. Run 004, then 005, then 008.

## Not planned

- Heading blur of 4px in the optical-spacing demo stays. It is under the 20px blur ceiling and it explains the content receding.
- The now-playing artwork glow may run longer than 300ms. It is atmosphere while a track plays, not a control.
- Home, writings, and archive row hovers stay instant. They are used all day.
