import { type JSX, splitProps } from 'solid-js';

import styles from '$/core/components/button/button.module.css';

export type ButtonDropDownContentProps = JSX.HTMLAttributes<HTMLDivElement>;

const ButtonDropDownContent = (passedProps: ButtonDropDownContentProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['children']);

  return (
    <div data-id="button-drop-down-content" {...restOfProps} class={styles.dropDownContent}>
      {props.children}
    </div>
  );
};

export default ButtonDropDownContent;
