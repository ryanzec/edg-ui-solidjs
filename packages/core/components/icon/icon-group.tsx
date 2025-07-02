import styles from '$/core/components/icon/icon.module.css';
import type { CommonDataAttributes } from '$/core/types/generic';
import classnames from 'classnames';
import { type JSX, splitProps } from 'solid-js';

export type IconGroupProps = JSX.HTMLAttributes<HTMLDivElement> & CommonDataAttributes;

const IconGroup = (passedProps: IconGroupProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['class']);

  return <div data-id="icon-group" class={classnames(styles.group, props.class)} {...restOfProps} />;
};

export default IconGroup;
