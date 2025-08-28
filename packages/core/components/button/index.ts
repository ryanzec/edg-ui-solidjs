import { default as BaseButton, type ButtonProps } from '$/core/components/button/button';
import DropDown, { type ButtonDropDownProps } from '$/core/components/button/button-drop-down';
import Group, { type ButtonGroupProps } from '$/core/components/button/button-group';
import Toggle, { type ButtonToggleProps } from '$/core/components/button/toggle-button';

import { ButtonColor, ButtonShape, ButtonSize, ButtonVariant } from '$/core/components/button/utils';

const Button = Object.assign(BaseButton, { DropDown, Group, Toggle });

export type { ButtonGroupProps, ButtonDropDownProps, ButtonProps, ButtonToggleProps };

export { Button, ButtonVariant, ButtonColor, ButtonShape, ButtonSize };

export default Button;
