import classnames from 'classnames';
import { type JSX, Show, mergeProps, splitProps } from 'solid-js';

import styles from '$/components/callout/callout.module.css';
import { CalloutColor, CalloutVariant } from '$/components/callout/utils';

export type CalloutProps = JSX.HTMLAttributes<HTMLDivElement> & {
  color?: CalloutColor;
  variant?: CalloutVariant;
  isCentered?: boolean;
  preItem?: JSX.Element;
  postItem?: JSX.Element;
};

const Callout = (passedProps: CalloutProps) => {
  const [props, restOfProps] = splitProps(
    mergeProps(
      {
        color: CalloutColor.BRAND,
        variant: CalloutVariant.WEAK,
        isCentered: true,
      },
      passedProps,
    ),
    ['color', 'variant', 'class', 'children', 'isCentered', 'preItem', 'postItem'],
  );
  const isStrong = props.variant === CalloutVariant.STRONG;

  return (
    <div
      class={classnames(props.class, styles.callout, {
        [styles.neutral]: props.color === CalloutColor.NEUTRAL,
        [styles.neutralStrong]: props.color === CalloutColor.NEUTRAL && isStrong,
        [styles.brand]: props.color === CalloutColor.BRAND,
        [styles.brandStrong]: props.color === CalloutColor.BRAND && isStrong,
        [styles.success]: props.color === CalloutColor.SUCCESS,
        [styles.successStrong]: props.color === CalloutColor.SUCCESS && isStrong,
        [styles.info]: props.color === CalloutColor.INFO,
        [styles.infoStrong]: props.color === CalloutColor.INFO && isStrong,
        [styles.warning]: props.color === CalloutColor.WARNING,
        [styles.warningStrong]: props.color === CalloutColor.WARNING && isStrong,
        [styles.danger]: props.color === CalloutColor.DANGER,
        [styles.dangerStrong]: props.color === CalloutColor.DANGER && isStrong,
      })}
      {...restOfProps}
    >
      <Show when={props.preItem}>
        <div class={styles.preItem}>{props.preItem}</div>
      </Show>
      <span
        class={classnames({
          [styles.centered]: props.isCentered,
        })}
      >
        {props.children}
      </span>
      <Show when={props.postItem}>
        <div class={styles.postItem}>{props.postItem}</div>
      </Show>
    </div>
  );
};

export default Callout;
