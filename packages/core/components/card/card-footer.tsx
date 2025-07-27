import { type JSX, mergeProps, splitProps } from 'solid-js';
import styles from '$/core/components/card/card.module.css';
import { CardFooterAlignment } from '$/core/components/card/utils';
import { tailwindUtils } from '$/core/utils/tailwind';

export type CardFooterProps = JSX.HTMLAttributes<HTMLDivElement> & {
  alignment?: CardFooterAlignment;
};

const CardFooter = (passedProps: CardFooterProps) => {
  const [props, restOfProps] = splitProps(mergeProps({ alignment: CardFooterAlignment.RIGHT }, passedProps), [
    'children',
    'class',
    'alignment',
  ]);

  return (
    <div
      data-id="footer"
      class={tailwindUtils.merge(styles.footer, {
        [styles.footerRightAligned]: props.alignment === CardFooterAlignment.RIGHT,
      })}
      {...restOfProps}
    >
      {props.children}
    </div>
  );
};

export default CardFooter;
