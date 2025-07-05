import { tailwindUtils } from '$/core/utils/tailwind';
import { splitProps } from 'solid-js';

import Button, { type ButtonProps } from '$/core/components/button/button';
import styles from '$/core/components/button/button.module.css';
import { ButtonColor, ButtonVariant } from '$/core/components/button/utils';

export type ButtonToggleProps = Omit<ButtonProps, 'variant' | 'color'> & {
  isSelected?: boolean;
};

const ToggleButton = (passedProps: ButtonToggleProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['class', 'isSelected']);

  return (
    <Button
      data-id="toggle-button"
      {...restOfProps}
      class={tailwindUtils.merge(props.class, { [styles.isSelected]: props.isSelected })}
      variant={ButtonVariant.OUTLINED}
      color={ButtonColor.NEUTRAL}
    />
  );
};

export default ToggleButton;
