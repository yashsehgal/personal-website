import { LAYOUT_ALIGN_OPTIONS } from './constants';
import { LAYOUT_ALIGN_CATEGORY } from './interfaces';

export function PositionLayoutAlignHorizontalOptions() {
  return (
    <div className="Layout-align-options--horizontal-options-container flex items-center justify-start gap-1">
      {LAYOUT_ALIGN_OPTIONS.map((layoutOption, index) => {
        const LayoutOptionIcon = layoutOption.defaultIcon;
        if (layoutOption.category === LAYOUT_ALIGN_CATEGORY.HORIZONTAL) {
          return (
            <button
              key={index}
              className="rounded-md p-1 flex items-center justify-center text-white bg-neutral-700 hover:bg-neutral-600 active:bg-neutral-500">
              <LayoutOptionIcon size={14} />
            </button>
          );
        }
      })}
    </div>
  );
}
