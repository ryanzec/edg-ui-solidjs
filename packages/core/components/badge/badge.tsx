import styles from '$/core/components/badge/badge.module.css';
import { BadgeColor, BadgeShape, BadgeSize, BadgeVariant } from '$/core/components/badge/utils';
import Icon, { IconSize, type IconName } from '$/core/components/icon';
import Typography, { TypographySize, type TypographyProps } from '$/core/components/typography';
import { tailwindUtils } from '$/core/utils/tailwind';
import { mergeProps, splitProps } from 'solid-js';

export type BadgeProps = Omit<TypographyProps, 'size' | 'color'> & {
  color?: BadgeColor;
  variant?: BadgeVariant;
  shape?: BadgeShape;
  size?: BadgeSize;
  preIcon?: IconName;
  postIcon?: IconName;
  iconClass?: string;
};

const badgeSizeTypographySizeMap: Record<BadgeSize, TypographySize> = {
  [BadgeSize.SMALL]: TypographySize.SMALL,
  [BadgeSize.MEDIUM]: TypographySize.BASE,
  [BadgeSize.LARGE]: TypographySize.LARGE,
};

const Badge = (passedProps: BadgeProps) => {
  const [props, restOfProps] = splitProps(
    mergeProps(
      {
        color: BadgeColor.BRAND,
        variant: BadgeVariant.WEAK,
        shape: BadgeShape.ROUNDED,
        size: BadgeSize.SMALL,
      },
      passedProps,
    ),
    ['color', 'variant', 'shape', 'size', 'class', 'children', 'preIcon', 'postIcon', 'iconClass'],
  );
  const isStrong = props.variant === BadgeVariant.STRONG;

  return (
    <Typography
      data-id="badge"
      {...restOfProps}
      size={badgeSizeTypographySizeMap[props.size]}
      class={tailwindUtils.merge(props.class, styles.badge, {
        [styles.badgeLarge]: props.size === BadgeSize.LARGE,
        [styles.badgePill]: props.shape === BadgeShape.PILL,
        [styles.neutral]: props.color === BadgeColor.NEUTRAL,
        [styles.neutralStrong]: props.color === BadgeColor.NEUTRAL && isStrong,
        [styles.brand]: props.color === BadgeColor.BRAND,
        [styles.brandStrong]: props.color === BadgeColor.BRAND && isStrong,
        [styles.brandSecondary]: props.color === BadgeColor.BRAND_SECONDARY,
        [styles.brandSecondaryStrong]: props.color === BadgeColor.BRAND_SECONDARY && isStrong,
        [styles.success]: props.color === BadgeColor.SUCCESS,
        [styles.successStrong]: props.color === BadgeColor.SUCCESS && isStrong,
        [styles.info]: props.color === BadgeColor.INFO,
        [styles.infoStrong]: props.color === BadgeColor.INFO && isStrong,
        [styles.warning]: props.color === BadgeColor.WARNING,
        [styles.warningStrong]: props.color === BadgeColor.WARNING && isStrong,
        [styles.warningHigh]: props.color === BadgeColor.WARNING_HIGH,
        [styles.warningHighStrong]: props.color === BadgeColor.WARNING_HIGH && isStrong,
        [styles.danger]: props.color === BadgeColor.DANGER,
        [styles.dangerStrong]: props.color === BadgeColor.DANGER && isStrong,
        [styles.transparent]: props.variant === BadgeVariant.TRANSPARENT,
      })}
    >
      {props.preIcon && (
        <Icon
          icon={props.preIcon}
          class={tailwindUtils.merge(styles.icon, props.iconClass)}
          size={props.size === BadgeSize.LARGE ? IconSize.EXTRA_LARGE : undefined}
        />
      )}
      {props.children}
      {props.postIcon && (
        <Icon
          icon={props.postIcon}
          class={tailwindUtils.merge(styles.icon, props.iconClass)}
          size={props.size === BadgeSize.LARGE ? IconSize.EXTRA_LARGE : undefined}
        />
      )}
    </Typography>
  );
};

export default Badge;
