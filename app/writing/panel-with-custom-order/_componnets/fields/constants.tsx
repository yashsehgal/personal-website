import { ReactNode } from 'react';
import { FIELD, LAYOUT_ALIGN, LAYOUT_ALIGN_CATEGORY } from './interfaces';
import { CustomOrderPanelFieldPosition } from './position';
import {
  IconLayoutAlignBottom,
  IconLayoutAlignCenter,
  IconLayoutAlignLeft,
  IconLayoutAlignMiddle,
  IconLayoutAlignRight,
  IconLayoutAlignTop,
  TablerIcon,
} from '@tabler/icons-react';

export const PANEL: Record<FIELD, ReactNode> = {
  [FIELD.POSITION]: <CustomOrderPanelFieldPosition />,
  [FIELD.LAYOUT]: <></>,
  [FIELD.APPEARANCE]: <></>,
  [FIELD.FILL]: <></>,
  [FIELD.STROKE]: <></>,
  [FIELD.EFFECTS]: <></>,
  [FIELD.EXPORT]: <></>,
} as const;

export const LAYOUT_ALIGN_OPTIONS: {
  layoutAlign: LAYOUT_ALIGN;
  category: LAYOUT_ALIGN_CATEGORY;
  defaultIcon: TablerIcon;
}[] = [
  {
    layoutAlign: LAYOUT_ALIGN.LEFT,
    category: LAYOUT_ALIGN_CATEGORY.VERTICAL,
    defaultIcon: IconLayoutAlignLeft,
  },
  {
    layoutAlign: LAYOUT_ALIGN.RIGHT,
    category: LAYOUT_ALIGN_CATEGORY.VERTICAL,
    defaultIcon: IconLayoutAlignRight,
  },
  {
    layoutAlign: LAYOUT_ALIGN.CENTER,
    category: LAYOUT_ALIGN_CATEGORY.VERTICAL,
    defaultIcon: IconLayoutAlignCenter,
  },
  {
    layoutAlign: LAYOUT_ALIGN.TOP,
    category: LAYOUT_ALIGN_CATEGORY.HORIZONTAL,
    defaultIcon: IconLayoutAlignTop,
  },
  {
    layoutAlign: LAYOUT_ALIGN.BOTTOM,
    category: LAYOUT_ALIGN_CATEGORY.HORIZONTAL,
    defaultIcon: IconLayoutAlignBottom,
  },
  {
    layoutAlign: LAYOUT_ALIGN.MIDDLE,
    category: LAYOUT_ALIGN_CATEGORY.HORIZONTAL,
    defaultIcon: IconLayoutAlignMiddle,
  },
] as const;
