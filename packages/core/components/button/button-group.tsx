import { tailwindUtils } from '$/core/utils/tailwind';
import { type JSX, splitProps } from 'solid-js';

import styles from '$/core/components/button/button.module.css';

export type ButtonGroupProps = JSX.HTMLAttributes<HTMLDivElement> & {
  isAttached?: boolean;
};

const ButtonGroup = (passedProps: ButtonGroupProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['class', 'isAttached']);

  return (
    <div
      data-id="button-group"
      {...restOfProps}
      class={tailwindUtils.merge(styles.buttonGroup, props.class, {
        [styles.buttonGroupAttached]: props.isAttached,
      })}
    />
  );
};

export default ButtonGroup;
