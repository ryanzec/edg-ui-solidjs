import { default as BaseRadio, type RadioProps } from '$/core/components/radio/radio';
import Group, { type RadioGroupProps } from '$/core/components/radio/radio-group';

export type { RadioGroupProps, RadioProps };

export const Radio = Object.assign(BaseRadio, { Group });

export default Radio;
