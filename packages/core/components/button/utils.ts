export const ButtonVariant = {
  FILLED: 'filled',
  WEAK: 'weak',
  OUTLINED: 'outlined',
  GHOST: 'ghost',
} as const;

export type ButtonVariant = (typeof ButtonVariant)[keyof typeof ButtonVariant];

export const ButtonItemPosition = {
  PRE: 'pre',
  POST: 'post',
} as const;

export type ButtonItemPosition = (typeof ButtonItemPosition)[keyof typeof ButtonItemPosition];

export const ButtonColor = {
  NEUTRAL: 'neutral',
  BRAND: 'brand',
  BRAND_SECONDARY: 'brand-secondary',
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  WARNING_HIGH: 'warning-high',
  DANGER: 'danger',
} as const;

export type ButtonColor = (typeof ButtonColor)[keyof typeof ButtonColor];

export const ButtonShape = {
  ROUNDED: 'rounded',
  CIRCLE: 'circle',
} as const;

export type ButtonShape = (typeof ButtonShape)[keyof typeof ButtonShape];

export const ButtonSize = {
  SMALL: 'small',
  BASE: 'base',
} as const;

export type ButtonSize = (typeof ButtonSize)[keyof typeof ButtonSize];
