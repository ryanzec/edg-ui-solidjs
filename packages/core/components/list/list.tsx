import { tailwindUtils } from '$/core/utils/tailwind';
import { type JSX, splitProps } from 'solid-js';

import styles from '$/core/components/list/list.module.css';
import type { CommonDataAttributes } from '$/core/types/generic';

export type ListProps = JSX.HTMLAttributes<HTMLDivElement> & CommonDataAttributes;

const List = (passedProps: ListProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['class']);

  return <div data-id="list" {...restOfProps} class={tailwindUtils.merge(styles.list, props.class)} />;
};

export default List;
