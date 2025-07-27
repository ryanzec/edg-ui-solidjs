import { type JSX, mergeProps, splitProps } from 'solid-js';
import styles from '$/core/components/icon/icon.module.css';
import { IconColor, type IconName, IconSize, IconVariant } from '$/core/components/icon/utils';
import { tailwindUtils } from '$/core/utils/tailwind';

export type IconProps = JSX.HTMLAttributes<HTMLElement> & {
  icon: IconName;
  size?: IconSize;
  color?: IconColor;
  variant?: IconVariant;
  isClickable?: boolean;
};

const Icon = (passedProps: IconProps) => {
  const [props, restOfProps] = splitProps(
    mergeProps(
      {
        size: IconSize.BASE,
        color: IconColor.INHERIT,
        isClickable: false,
        variant: IconVariant.REGULAR,
      },
      passedProps,
    ),
    ['class', 'icon', 'size', 'color', 'isClickable', 'variant'],
  );

  return (
    <i
      data-id="icon"
      {...restOfProps}
      class={tailwindUtils.merge(`ph-${props.icon}`, styles.icon, props.class, {
        ph: props.variant === IconVariant.REGULAR,
        'ph-bold': props.variant === IconVariant.BOLD,
        'ph-fill': props.variant === IconVariant.FILL,
        [styles.large]: props.size === IconSize.LARGE,
        [styles.extra_large]: props.size === IconSize.EXTRA_LARGE,
        [styles.extra_large2]: props.size === IconSize.EXTRA_LARGE2,
        [styles.extra_large3]: props.size === IconSize.EXTRA_LARGE3,
        [styles.extra_large4]: props.size === IconSize.EXTRA_LARGE4,
        [styles.neutral]: props.color === IconColor.NEUTRAL,
        [styles.brand]: props.color === IconColor.BRAND,
        [styles.success]: props.color === IconColor.SUCCESS,
        [styles.info]: props.color === IconColor.INFO,
        [styles.warning]: props.color === IconColor.WARNING,
        [styles.warningHigh]: props.color === IconColor.WARNING_HIGH,
        [styles.danger]: props.color === IconColor.DANGER,
        [styles.inherit]: props.color === IconColor.INHERIT,
        [styles.clickable]: !!restOfProps.onClick || props.isClickable,
      })}
    />
  );
};

export default Icon;
