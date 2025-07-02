import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const customMerge = extendTailwindMerge<string>({
  extend: {
    // for multi-class
    theme: {
      spacing: ['none', '4xs', '3xs', '2xs', 'xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl'],
      radius: ['none', 'xs', 'sm', 'base', 'lg', 'xl', 'full'],
    },
    classGroups: {
      z: [
        {
          z: [
            'side-navigation-border',
            'combobox-options',
            'combobox-options-opened',
            'date-picker-input-picker',
            'overlay',
            'over-overlay',
            'drop-down',
            'dialog',
            'global-notifications',
            'tooltip',
          ],
        },
      ],
      opacity: [
        {
          opacity: ['none', 'overlay-weak', 'disabled', 'overlay-strong', 'full'],
        },
      ],
      'font-weight': [{ font: ['regular', 'medium', 'semibold', 'bold'] }],
    },
  },
});

/**
 * Utility function to merge multiple class values, handling conflicts according
 * to Tailwind's approach where later classes have precedence.
 */
const merge = (...inputs: ClassValue[]) => {
  return customMerge(clsx(inputs));
};

export const tailwindUtils = {
  merge,
};
