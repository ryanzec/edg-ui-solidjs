import classnames from 'classnames';
import { type JSX, splitProps } from 'solid-js';

import styles from '$/core/components/card/card.module.css';

export type CardContentProps = JSX.HTMLAttributes<HTMLDivElement>;

const CardContent = (passedProps: CardContentProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['children', 'class']);

  return (
    <div data-id="content" class={classnames(styles.content, props.class)} {...restOfProps}>
      {props.children}
    </div>
  );
};

export default CardContent;
