import { tailwindUtils } from '$/core/utils/tailwind';
import { type JSX, splitProps } from 'solid-js';

import styles from '$/core/components/peek/peek.module.css';
import type { CommonDataAttributes } from '$/core/types/generic';

export type PeekFooterProps = JSX.HTMLAttributes<HTMLDivElement> & CommonDataAttributes;

const PeekFooter = (passedProps: PeekFooterProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['children', 'class']);

  return (
    <div data-id="footer" {...restOfProps} class={tailwindUtils.merge(styles.peekFooter, props.class)}>
      {props.children}
    </div>
  );
};

export default PeekFooter;
