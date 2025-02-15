import Radio, { type RadioProps } from '$/core/components/radio/radio';
import Group, { type RadioGroupProps } from '$/core/components/radio/radio-group';

export type { RadioGroupProps, RadioProps };

export default Object.assign(Radio, { Group });
