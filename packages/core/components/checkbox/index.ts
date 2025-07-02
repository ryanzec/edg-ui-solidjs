import { default as BaseCheckbox, type CheckboxProps } from '$/core/components/checkbox/checkbox';
import Group, { type CheckboxGroupProps } from '$/core/components/checkbox/checkbox-group';
import Toggle, { type CheckboxToggleProps } from '$/core/components/checkbox/checkbox-toggle';

export type { CheckboxProps, CheckboxGroupProps, CheckboxToggleProps };

export const Checkbox = Object.assign(BaseCheckbox, { Group, Toggle });

export default Checkbox;
