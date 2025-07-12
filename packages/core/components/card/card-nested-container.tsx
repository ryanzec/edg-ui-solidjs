import { tailwindUtils } from '$/core/utils/tailwind';
import { type JSX, splitProps } from 'solid-js';

import styles from '$/core/components/card/card.module.css';

export type CardNestedContainerProps = JSX.HTMLAttributes<HTMLDivElement>;

const CardNestedContainer = (passedProps: CardNestedContainerProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['children', 'class']);

  return (
    <div data-id="nested-container" class={tailwindUtils.merge(styles.nestedContainer, props.class)} {...restOfProps}>
      {props.children}
    </div>
  );
};

export default CardNestedContainer;
