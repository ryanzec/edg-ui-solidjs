import Input, { type InputProps } from '$/components/input/input';
import Icon, { type InputIconProps } from '$/components/input/input-icon';
import Multiple, { type InputMultipleProps } from '$/components/input/input-multiple';

export type { InputProps, InputIconProps, InputMultipleProps };

export default Object.assign(Input, { Icon, Multiple });
