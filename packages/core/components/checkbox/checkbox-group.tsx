import { tailwindUtils } from '$/core/utils/tailwind';
import { type JSX, splitProps } from 'solid-js';

import styles from '$/core/components/checkbox/checkbox.module.css';

export type CheckboxGroupProps = JSX.HTMLAttributes<HTMLDivElement>;

// we exposed a plain input in the off chance we need an input not hooked up to react-hook-form directly (like the
// auto complete component)
const CheckboxGroup = (passedProps: CheckboxGroupProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['class', 'children']);

  return (
    <div data-id="checkbox-group" {...restOfProps} class={tailwindUtils.merge(styles.group, props.class)}>
      {props.children}
    </div>
  );
};

// by default, we should be using the input the auto hooks with react-hook-form
export default CheckboxGroup;
