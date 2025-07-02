import { type JSX, createContext, mergeProps, splitProps } from 'solid-js';

import type { CommonDataAttributes } from '$/core/types/generic';
import { tailwindUtils } from '$/core/utils/tailwind';

export const TabSize = {
  DEFAULT: 'default',
  SMALL: 'small',
} as const;

export type TabSize = (typeof TabSize)[keyof typeof TabSize];

export const TabOrientation = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
} as const;

export type TabOrientation = (typeof TabOrientation)[keyof typeof TabOrientation];

export const TabVariant = {
  DEFAULT: 'default',
  FILES: 'files',
} as const;

export type TabVariant = (typeof TabVariant)[keyof typeof TabVariant];

type TabsCustomProps = {
  onInverse?: boolean;
  size?: TabSize;
  orientation?: TabOrientation;
  variant?: TabVariant;
};

export const TabsContext = createContext<TabsCustomProps>();

export type TabsProps = JSX.HTMLAttributes<HTMLDivElement> & CommonDataAttributes & TabsCustomProps;

const Tabs = (passedProps: TabsProps) => {
  const [props, restOfProps] = splitProps(
    mergeProps(
      { onInverse: false, size: TabSize.DEFAULT, orientation: TabOrientation.HORIZONTAL, variant: TabVariant.DEFAULT },
      passedProps,
    ),
    ['class', 'onInverse', 'size', 'orientation', 'variant'],
  );

  return (
    <TabsContext.Provider value={props}>
      <div
        data-id="tabs"
        {...restOfProps}
        class={tailwindUtils.merge('flex', props.class, {
          'gap-2xs': props.variant === TabVariant.DEFAULT,
          'flex-col': props.orientation === TabOrientation.VERTICAL,
        })}
      />
    </TabsContext.Provider>
  );
};

export default Tabs;
