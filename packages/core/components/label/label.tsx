import { tailwindUtils } from '$/core/utils/tailwind';
import { type JSX, Show, mergeProps, splitProps } from 'solid-js';

import type { IconSize } from '$/core/components/icon';
import iconStyles from '$/core/components/icon/icon.module.css';
import styles from '$/core/components/label/label.module.css';
import Loading from '$/core/components/loading';

export type LabelProps = JSX.LabelHTMLAttributes<HTMLLabelElement> & {
  isLoading?: boolean;
  postElement?: JSX.Element;
  iconSize?: IconSize;
};

const Label = (passedProps: LabelProps) => {
  const [props, restOfProps] = splitProps(mergeProps({ isLoading: false }, passedProps), [
    'children',
    'class',
    'isLoading',
    'postElement',
  ]);

  return (
    <div data-id="label-container" class={tailwindUtils.merge(styles.container, props.class)}>
      {/* biome-ignore lint/a11y/noLabelWithoutControl: provided by ...restOfProps */}
      <label data-id="label" {...restOfProps} class={tailwindUtils.merge(styles.label, props.class)}>
        {props.children}
        <Show when={props.isLoading}>
          <Loading class={iconStyles.spacingLeft} />
        </Show>
      </label>
      <Show when={props.postElement}>
        <div class={styles.postItem}>{props.postElement}</div>
      </Show>
    </div>
  );
};

export default Label;
