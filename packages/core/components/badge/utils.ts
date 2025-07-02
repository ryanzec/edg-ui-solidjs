export const BadgeColor = {
  NEUTRAL: 'neutral',
  BRAND: 'brand',
  BRAND_SECONDARY: 'brand-secondary',
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  WARNING_HIGH: 'warning-high',
  DANGER: 'danger',
} as const;

export type BadgeColor = (typeof BadgeColor)[keyof typeof BadgeColor];

export const BadgeVariant = {
  WEAK: 'weak',
  STRONG: 'strong',
  TRANSPARENT: 'transparent',
} as const;

export type BadgeVariant = (typeof BadgeVariant)[keyof typeof BadgeVariant];

export const BadgeSize = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
} as const;

export type BadgeSize = (typeof BadgeSize)[keyof typeof BadgeSize];

export const BadgeShape = {
  ROUNDED: 'rounded',
  PILL: 'pill',
} as const;

export type BadgeShape = (typeof BadgeShape)[keyof typeof BadgeShape];
