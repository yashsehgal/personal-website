import { FieldContainer } from './field-container';
import { PositionLayoutAlignVerticalOptions } from './position-layout-align-vertical-options';
import { PositionLayoutAlignHorizontalOptions } from './position-layout-align-horizontal-options';

export function CustomOrderPanelFieldPosition() {
  return (
    <FieldContainer name="Position">
      <div className="Layout-align-options-container flex items-center justify-start gap-4">
        <PositionLayoutAlignVerticalOptions />
        <PositionLayoutAlignHorizontalOptions />
      </div>
    </FieldContainer>
  );
}
