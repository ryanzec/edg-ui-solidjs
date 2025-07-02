import { type JSX, splitProps } from 'solid-js';

import styles from '$/core/components/checkbox/checkbox.module.css';
import { tailwindUtils } from '$/core/utils/tailwind';

export type CheckboxToggleProps = JSX.InputHTMLAttributes<HTMLInputElement> & {
  labelElement: JSX.Element;
  alignEnd?: boolean;
};

// we exposed a plain input in the off chance we need an input not hooked up to react-hook-form directly (like the
// auto complete component)
const CheckboxToggle = (passedProps: CheckboxToggleProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['class', 'labelElement', 'alignEnd', 'onChange']);

  return (
    <label class={tailwindUtils.merge(styles.toggleContainer)}>
      <input
        data-id="checkbox-toggle"
        {...restOfProps}
        type="checkbox"
        // onChange={handleChange}
        class={tailwindUtils.merge(styles.toggle, props.class)}
      />
      {props.labelElement}
    </label>
  );
};

// by default, we should be using the input the auto hooks with react-hook-form
export default CheckboxToggle;
