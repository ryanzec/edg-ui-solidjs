export const IconSize = {
  BASE: 'base',
  LARGE: 'large',
  EXTRA_LARGE: 'extra-large',
  EXTRA_LARGE2: 'extra-large2',
  EXTRA_LARGE3: 'extra-large3',
  EXTRA_LARGE4: 'extra-large4',

  // while these are technically valid font sizes, the icon as these size don't look good so disabling them for now
  // EXTRA_SMALL: 'extra-small',
  // SMALL: 'small',
} as const;

export type IconSize = (typeof IconSize)[keyof typeof IconSize];

export const IconColor = {
  INHERIT: 'inherit',
  NEUTRAL: 'neutral',
  BRAND: 'brand',
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  WARNING_HIGH: 'warning-high',
  DANGER: 'danger',
} as const;

export type IconColor = (typeof IconColor)[keyof typeof IconColor];

export const IconVariant = {
  REGULAR: 'regular',
  BOLD: 'bold',
  FILL: 'fill',
} as const;

export type IconVariant = (typeof IconVariant)[keyof typeof IconVariant];

// since phosphor has 1000's of icons, when we want to add one, we add it here is order to make sure we are more
// consistent with icon usage and can easily track when we add a new icon to the system
export const supportedIconNames = [
  'warning-circle',
  'warning',
  'text-align-justify',
  'arrow-down',
  'arrow-left',
  'arrow-right',
  'arrow-up',
  'arrows-down-up',
  'lightning',
  'check',
  'caret-down',
  'caret-left',
  'caret-right',
  'caret-up',
  'circle',
  'check-circle',
  'plus-circle',
  'x-circle',
  'copy',
  'database',
  'floppy-disk',
  'dots-three',
  'eye',
  'arrow-square-out',
  'funnel',
  'flag',
  'dots-six-vertical',
  'house',
  'info',
  'list-dashes',
  'spinner',
  'envelope',
  'magnifying-glass',
  'minus',
  'minus-circle',
  'moon',
  'pencil',
  'plug',
  'plus',
  'dot-outline',
  'question-mark',
  'caret-up-down',
  'square',
  'check-square',
  'minus-square',
  'sun',
  'sword',
  'thumbs-down',
  'thumbs-up',
  'trash',
  'trend-down',
  'trend-up',
  'x',
] as const;

export type IconName = (typeof supportedIconNames)[number];
