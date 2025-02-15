import Checkbox, { type CheckboxProps } from '$/core/components/checkbox/checkbox';
import Group, { type CheckboxGroupProps } from '$/core/components/checkbox/checkbox-group';
import Toggle, { type CheckboxToggleProps } from '$/core/components/checkbox/checkbox-toggle';

export type { CheckboxGroupProps, CheckboxProps, CheckboxToggleProps };

export default Object.assign(Checkbox, { Group, Toggle });
