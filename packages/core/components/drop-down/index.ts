import { default as BaseDropDown, type DropDownProps } from '$/core/components/drop-down/drop-down';
import Menu from '$/core/components/drop-down/drop-down-menu';

export type { DropDownProps };

export const DropDown = Object.assign(BaseDropDown, {
  Menu,
});

export default DropDown;
