import { PANEL } from './fields/constants';
import { FIELD } from './fields/interfaces';

export function CustomOrderPanel() {
  return (
    <div className="Custom-order-panel p-2 border rounded-2xl bg-neutral-50 shadow-inner">
      {Object.keys(PANEL).map((field) => {
        const typedField = field as FIELD;
        const FieldComponent = PANEL[typedField];
        return FieldComponent;
      })}
    </div>
  );
}
