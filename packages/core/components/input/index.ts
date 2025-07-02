import { default as BaseInput, type InputProps } from '$/core/components/input/input';
import Icon, { type InputIconProps } from '$/core/components/input/input-icon';
import Multiple, { type InputMultipleProps } from '$/core/components/input/input-multiple';

export type { InputProps, InputIconProps, InputMultipleProps };

export const Input = Object.assign(BaseInput, { Icon, Multiple });

export default Input;
