import styles from '$/core/components/typography/typography.module.css';
import { tailwindUtils } from '$/core/utils/tailwind';
import type { JSX } from 'solid-js';
import { mergeProps, splitProps } from 'solid-js';

export const TypographySize = {
  EXTRA_SMALL: 'extra-small',
  SMALL: 'small',
  BASE: 'base',
  LARGE: 'large',
  EXTRA_LARGE: 'extra-large',
  EXTRA_LARGE2: 'extra-large2',
  EXTRA_LARGE3: 'extra-large3',
  EXTRA_LARGE4: 'extra-large4',
} as const;

export type TypographySize = (typeof TypographySize)[keyof typeof TypographySize];

export const TypographyColor = {
  NONE: 'none',
  INHERIT: 'inherit',
  NEUTRAL: 'neutral',
  BRAND: 'brand',
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  WARNING_HIGH: 'warning-high',
  DANGER: 'danger',
} as const;

export type TypographyColor = (typeof TypographyColor)[keyof typeof TypographyColor];

export const TypographyLayout = {
  INLINE: 'inline',
  BLOCK: 'block',
} as const;

export type TypographyLayout = (typeof TypographyLayout)[keyof typeof TypographyLayout];

export type TypographyProps = JSX.HTMLAttributes<HTMLDivElement> & {
  size?: TypographySize;
  color?: TypographyColor;
  class?: string;
  layout?: TypographyLayout;
};

const Typography = (passedProps: TypographyProps) => {
  const [props, restOfProps] = splitProps(
    mergeProps(
      { size: TypographySize.BASE, color: TypographyColor.INHERIT, layout: TypographyLayout.BLOCK },
      passedProps,
    ),
    ['children', 'class', 'size', 'color', 'layout'],
  );

  return (
    <div
      {...restOfProps}
      class={tailwindUtils.merge(
        styles.typography,
        {
          [styles.extraSmall]: props.size === TypographySize.EXTRA_SMALL,
          [styles.small]: props.size === TypographySize.SMALL,
          [styles.large]: props.size === TypographySize.LARGE,
          [styles.extraLarge]: props.size === TypographySize.EXTRA_LARGE,
          [styles.extraLarge2]: props.size === TypographySize.EXTRA_LARGE2,
          [styles.extraLarge3]: props.size === TypographySize.EXTRA_LARGE3,
          [styles.extraLarge4]: props.size === TypographySize.EXTRA_LARGE4,
          [styles.neutral]: props.color === TypographyColor.NEUTRAL,
          [styles.brand]: props.color === TypographyColor.BRAND,
          [styles.success]: props.color === TypographyColor.SUCCESS,
          [styles.info]: props.color === TypographyColor.INFO,
          [styles.warning]: props.color === TypographyColor.WARNING,
          [styles.warningHigh]: props.color === TypographyColor.WARNING_HIGH,
          [styles.danger]: props.color === TypographyColor.DANGER,
          [styles.inheritColor]: props.color === TypographyColor.INHERIT,

          // using flex will prevent extra space that can appear at the bottom
          'inline-flex': props.layout === TypographyLayout.INLINE,
          flex: props.layout === TypographyLayout.BLOCK,
        },
        props.class,
      )}
    >
      {props.children}
    </div>
  );
};

export default Typography;
