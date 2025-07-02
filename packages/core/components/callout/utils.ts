export const CalloutColor = {
  NEUTRAL: 'neutral',
  BRAND: 'brand',
  BRAND_SECONDARY: 'brand-secondary',
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  WARNING_HIGH: 'warning-high',
  DANGER: 'danger',
} as const;

export type CalloutColor = (typeof CalloutColor)[keyof typeof CalloutColor];

export const CalloutVariant = {
  WEAK: 'weak',
  STRONG: 'strong',
} as const;

export type CalloutVariant = (typeof CalloutVariant)[keyof typeof CalloutVariant];
