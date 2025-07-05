import { tailwindUtils } from '$/core/utils/tailwind';
import { type JSX, Show, mergeProps, splitProps } from 'solid-js';

import styles from '$/core/components/callout/callout.module.css';
import { CalloutColor, CalloutVariant } from '$/core/components/callout/utils';

export type CalloutProps = JSX.HTMLAttributes<HTMLDivElement> & {
  color?: CalloutColor;
  variant?: CalloutVariant;
  isCentered?: boolean;
  preElement?: JSX.Element;
  postElement?: JSX.Element;
  extraContentElement?: JSX.Element;
  contentClass?: string;
  hasSideBorder?: boolean;
  inheritTextColor?: boolean;
};

const Callout = (passedProps: CalloutProps) => {
  const [props, restOfProps] = splitProps(
    mergeProps(
      {
        color: CalloutColor.BRAND,
        variant: CalloutVariant.WEAK,
        isCentered: false,
        hasSideBorder: false,
        inheritTextColor: false,
      },
      passedProps,
    ),
    [
      'color',
      'variant',
      'class',
      'children',
      'isCentered',
      'preElement',
      'postElement',
      'contentClass',
      'hasSideBorder',
      'inheritTextColor',
      'extraContentElement',
    ],
  );
  const isStrong = props.variant === CalloutVariant.STRONG;

  return (
    <div
      data-id="callout"
      {...restOfProps}
      class={tailwindUtils.merge(props.class, styles.callout, {
        [styles.sideBorder]: props.hasSideBorder,
        [styles.neutral]: props.color === CalloutColor.NEUTRAL,
        [styles.neutralStrong]: props.color === CalloutColor.NEUTRAL && isStrong,
        [styles.brand]: props.color === CalloutColor.BRAND,
        [styles.brandStrong]: props.color === CalloutColor.BRAND && isStrong,
        [styles.brandSecondary]: props.color === CalloutColor.BRAND_SECONDARY,
        [styles.brandSecondaryStrong]: props.color === CalloutColor.BRAND_SECONDARY && isStrong,
        [styles.success]: props.color === CalloutColor.SUCCESS,
        [styles.successStrong]: props.color === CalloutColor.SUCCESS && isStrong,
        [styles.info]: props.color === CalloutColor.INFO,
        [styles.infoStrong]: props.color === CalloutColor.INFO && isStrong,
        [styles.warning]: props.color === CalloutColor.WARNING,
        [styles.warningStrong]: props.color === CalloutColor.WARNING && isStrong,
        [styles.warningHigh]: props.color === CalloutColor.WARNING_HIGH,
        [styles.warningHighStrong]: props.color === CalloutColor.WARNING_HIGH && isStrong,
        [styles.danger]: props.color === CalloutColor.DANGER,
        [styles.dangerStrong]: props.color === CalloutColor.DANGER && isStrong,
        [styles.inheritText]: props.inheritTextColor,
      })}
    >
      <Show when={props.preElement}>
        <div class={styles.preItem}>{props.preElement}</div>
      </Show>
      <span
        class={tailwindUtils.merge('flex flex-col gap-2xs items-start', props.contentClass, {
          [styles.centered]: props.isCentered,
        })}
      >
        {props.children}
        {props.extraContentElement}
      </span>
      <Show when={props.postElement}>
        <div class={styles.postItem}>{props.postElement}</div>
      </Show>
    </div>
  );
};

export default Callout;
