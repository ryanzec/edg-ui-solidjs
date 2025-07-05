import { default as BaseInput, type InputProps } from '$/core/components/input/input';
import Multiple, { type InputMultipleProps } from '$/core/components/input/input-multiple';

export type { InputProps, InputMultipleProps };

export const Input = Object.assign(BaseInput, { Multiple });

export default Input;
