import { default as BaseInput, type InputProps } from '$/core/components/input/input';
import DebouncedSearch, { type InputDebouncedSearchProps } from '$/core/components/input/input-debounced-search';
import Multiple, { type InputMultipleProps } from '$/core/components/input/input-multiple';

export type { InputProps, InputMultipleProps, InputDebouncedSearchProps };

export const Input = Object.assign(BaseInput, { Multiple, DebouncedSearch });

export default Input;
