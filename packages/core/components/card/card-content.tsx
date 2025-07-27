import { type JSX, splitProps } from 'solid-js';
import styles from '$/core/components/card/card.module.css';
import { tailwindUtils } from '$/core/utils/tailwind';

export type CardContentProps = JSX.HTMLAttributes<HTMLDivElement>;

const CardContent = (passedProps: CardContentProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['children', 'class']);

  return (
    <div data-id="content" class={tailwindUtils.merge(styles.content, props.class)} {...restOfProps}>
      {props.children}
    </div>
  );
};

export default CardContent;
