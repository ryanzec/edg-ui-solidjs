import { type JSX, splitProps } from 'solid-js';
import styles from '$/core/components/icon/icon.module.css';
import type { CommonDataAttributes } from '$/core/types/generic';
import { tailwindUtils } from '$/core/utils/tailwind';

export type IconGroupProps = JSX.HTMLAttributes<HTMLDivElement> & CommonDataAttributes;

const IconGroup = (passedProps: IconGroupProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['class']);

  return <div data-id="icon-group" class={tailwindUtils.merge(styles.group, props.class)} {...restOfProps} />;
};

export default IconGroup;
