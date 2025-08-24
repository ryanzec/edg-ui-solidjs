import { type Accessor, createContext, type JSX, mergeProps, splitProps } from 'solid-js';
import { tailwindUtils } from '$/core/utils/tailwind';

export type ScrollAreaContextData = {
  isReady: Accessor<boolean>;
};

export const ScrollAreaContext = createContext<ScrollAreaContextData>();

export const ScrollAreaDirection = {
  NONE: 'none',
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
  BOTH: 'both',
} as const;

export type ScrollAreaDirection = (typeof ScrollAreaDirection)[keyof typeof ScrollAreaDirection];

export const ScrollAreaDisplay = {
  VISIBLE: 'visible',
  HIDDEN: 'hidden',
} as const;

export type ScrollAreaDisplay = (typeof ScrollAreaDisplay)[keyof typeof ScrollAreaDisplay];

export type ScrollAreaProps = JSX.HTMLAttributes<HTMLDivElement> & {
  direction?: ScrollAreaDirection;
  display?: ScrollAreaDisplay;
  ref?: (element: HTMLElement | undefined) => void;
};

const ScrollArea = (passedProps: ScrollAreaProps) => {
  const [props, restOfProps] = splitProps(
    mergeProps(
      { overlapContent: true, direction: ScrollAreaDirection.BOTH, display: ScrollAreaDisplay.VISIBLE },
      passedProps,
    ),
    ['direction', 'display', 'class', 'children'],
  );

  return (
    <div
      {...restOfProps}
      class={tailwindUtils.merge(
        'h-full w-full custom-scrollbars',
        {
          'scrollbar-none': props.display === ScrollAreaDisplay.HIDDEN,
          'overflow-x-auto': props.direction === ScrollAreaDirection.HORIZONTAL,
          'overflow-y-auto': props.direction === ScrollAreaDirection.VERTICAL,
          'overflow-x-auto overflow-y-auto': props.direction === ScrollAreaDirection.BOTH,
        },
        props.class,
      )}
    >
      {props.children}
    </div>
  );
};

export default ScrollArea;
