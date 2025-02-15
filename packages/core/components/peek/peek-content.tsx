import classnames from 'classnames';
import { type JSX, splitProps } from 'solid-js';

import styles from '$/core/components/peek/peek.module.css';
import ScrollArea from '$/core/components/scroll-area';
import type { CommonDataAttributes } from '$/core/types/generic';

export type PeekContentProps = JSX.HTMLAttributes<HTMLDivElement> & CommonDataAttributes;

const PeekContent = (passedProps: PeekContentProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['children', 'class']);

  return (
    <ScrollArea>
      <div data-id="content" {...restOfProps} class={classnames(styles.peekContent, props.class)}>
        {props.children}
      </div>
    </ScrollArea>
  );
};

export default PeekContent;
