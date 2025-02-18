import classnames from 'classnames';
import { type JSX, mergeProps, splitProps } from 'solid-js';

import styles from '$/core/components/icon/icon.module.css';
import { IconColor, type IconName, IconSize, iconComponents } from '$/core/components/icon/utils';

export type IconProps = JSX.HTMLAttributes<HTMLSpanElement> & {
  icon: IconName;
  size?: IconSize;
  color?: IconColor;
};

const Icon = (passedProps: IconProps) => {
  const [props, restOfProps] = splitProps(
    mergeProps(
      {
        size: IconSize.BASE,
        color: IconColor.INHERIT,
      },
      passedProps,
    ),
    ['class', 'icon', 'size', 'color'],
  );

  return (
    <span
      data-id="icon"
      {...restOfProps}
      innerHTML={iconComponents[props.icon]}
      class={classnames(styles.icon, props.class, {
        [styles.extra_small]: props.size === IconSize.EXTRA_SMALL,
        [styles.extra_small2]: props.size === IconSize.EXTRA_SMALL2,
        [styles.small]: props.size === IconSize.SMALL,
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
        [styles.danger]: props.color === IconColor.DANGER,
        [styles.inherit]: props.color === IconColor.INHERIT,
        [styles.clickable]: !!restOfProps.onClick,
      })}
    />
  );
};

export default Icon;
