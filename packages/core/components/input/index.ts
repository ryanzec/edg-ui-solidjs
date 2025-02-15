import Input, { type InputProps } from '$/core/components/input/input';
import Icon, { type InputIconProps } from '$/core/components/input/input-icon';
import Multiple, { type InputMultipleProps } from '$/core/components/input/input-multiple';

export type { InputProps, InputIconProps, InputMultipleProps };

export default Object.assign(Input, { Icon, Multiple });
