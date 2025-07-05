import { tailwindUtils } from '$/core/utils/tailwind';
import { type JSX, Show, mergeProps, splitProps } from 'solid-js';

import ButtonPrePostItem from '$/core/components/button/button-pre-post-item';
import styles from '$/core/components/button/button.module.css';
import {
  ButtonColor,
  ButtonItemPosition,
  ButtonShape,
  ButtonSize,
  ButtonState,
  ButtonVariant,
} from '$/core/components/button/utils';
import Icon from '$/core/components/icon';
import type { IconName } from '$/core/components/icon/utils';
import type { CommonDataAttributes } from '$/core/types/generic';

export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> &
  CommonDataAttributes & {
    variant?: ButtonVariant;
    color?: ButtonColor;
    state?: ButtonState;
    shape?: ButtonShape;
    preItem?: JSX.Element;
    postItem?: JSX.Element;
    loadingIconPosition?: ButtonItemPosition;
    size?: ButtonSize;
    icon?: IconName;
  };

export const Button = (passedProps: ButtonProps) => {
  const [props, restOfProps] = splitProps(
    mergeProps(
      {
        variant: ButtonVariant.FILLED,
        color: ButtonColor.BRAND,
        state: ButtonState.DEFAULT,
        shape: ButtonShape.ROUNDED,
        loadingIconPosition: ButtonItemPosition.PRE,
        size: ButtonSize.BASE,
      },
      passedProps,
    ),
    [
      'children',
      'variant',
      'disabled',
      'class',
      'preItem',
      'postItem',
      'loadingIconPosition',
      'state',
      'color',
      'shape',
      'size',
      'icon',
    ],
  );

  const isLoading = () => props.state === ButtonState.IS_LOADING;
  const hasPreItem = () => props.preItem || (isLoading() && props.loadingIconPosition === ButtonItemPosition.PRE);
  const hasPostItem = () => props.postItem || (isLoading() && props.loadingIconPosition === ButtonItemPosition.POST);

  return (
    <button
      data-id="button"
      type="button"
      {...restOfProps}
      class={tailwindUtils.merge(styles.button, props.class, {
        [styles.filled]: props.variant === ButtonVariant.FILLED,
        [styles.weak]: props.variant === ButtonVariant.WEAK,
        [styles.outlined]: props.variant === ButtonVariant.OUTLINED,
        [styles.ghost]: props.variant === ButtonVariant.GHOST,
        [styles.neutral]: props.color === ButtonColor.NEUTRAL,
        [styles.brand]: props.color === ButtonColor.BRAND,
        [styles.brandSecondary]: props.color === ButtonColor.BRAND_SECONDARY,
        [styles.success]: props.color === ButtonColor.SUCCESS,
        [styles.info]: props.color === ButtonColor.INFO,
        [styles.warning]: props.color === ButtonColor.WARNING,
        [styles.warningHigh]: props.color === ButtonColor.WARNING_HIGH,
        [styles.danger]: props.color === ButtonColor.DANGER,
        [styles.isLoading]: isLoading(),
        [styles.circle]: props.shape === ButtonShape.CIRCLE,
        [styles.small]: props.size === ButtonSize.SMALL,
      })}
      disabled={props.disabled || isLoading()}
    >
      <span class={styles.buttonContent}>
        {isLoading() && (
          <ButtonPrePostItem class={styles.preIcon} position={ButtonItemPosition.PRE} item={<Icon icon="spinner" />} />
        )}
        {!isLoading() && hasPreItem() && (
          <ButtonPrePostItem class={styles.preIcon} position={ButtonItemPosition.PRE} item={props.preItem} />
        )}
        <span class={styles.buttonMainContent}>
          {/*
           * while the fallback could be used to render the icon, it would result in a typescript error so just
           * using 2 <Show /> components
           */}
          <Show when={props.icon}>{(icon) => <Icon icon={icon()} />}</Show>
          <Show when={!props.icon}>{props.children}</Show>
        </span>
        {!isLoading() && hasPostItem() && (
          <ButtonPrePostItem class={styles.preIcon} position={ButtonItemPosition.POST} item={props.postItem} />
        )}
      </span>
    </button>
  );
};

export default Button;
