import 'overlayscrollbars/overlayscrollbars.css';

import type { OverlayScrollbars, PartialOptions } from 'overlayscrollbars';

import { OverlayScrollbarsComponent, type OverlayScrollbarsComponentProps } from 'overlayscrollbars-solid';
import { type Accessor, type Setter, children, createContext, createSignal, mergeProps, splitProps } from 'solid-js';

import styles from '$/core/components/scroll-area/scroll-area.module.css';
import { tailwindUtils } from '$/core/utils/tailwind';

export type ScrollAreaContextData = {
  isReady: Accessor<boolean>;
};

export const ScrollAreaContext = createContext<ScrollAreaContextData>();

const defaultScrollbarOptions: PartialOptions = {
  scrollbars: {
    autoHideDelay: 100,
  },
};

const ScrollArea = (
  passedProps: Omit<OverlayScrollbarsComponentProps, 'ref'> & {
    ref?: Setter<OverlayScrollbars | undefined>;
    overlapContent?: boolean;
  },
) => {
  const [props] = splitProps(mergeProps({ overlapContent: true }, passedProps), [
    'options',
    'class',
    'children',
    'ref',
    'overlapContent',
  ]);
  // don't doing this in the mergeProps as this way it needed to avoid typescript errors (to the best of my knowledg)
  const options = props.options || {};

  const [isReady, setIsReady] = createSignal(false);

  // @todo(refactor) this is to work around a bug in OverlayScrollbars that cause a double render of content
  // @todo(refactor) depending if the top element wrapped uses a signal
  // @todo(refactor) reference: https://github.com/KingSora/OverlayScrollbars/issues/700
  const contentAsVariable = children(() => (
    <ScrollAreaContext.Provider value={{ isReady }}>{props.children}</ScrollAreaContext.Provider>
  ));

  return (
    <OverlayScrollbarsComponent
      defer
      class={tailwindUtils.merge(
        styles.scrollArea,
        {
          'has-[[data-overlayscrollbars-viewport*="overflowXScroll"]]:pb-[10px] has-[[data-overlayscrollbars-viewport*="overflowYScroll"]]:pr-[10px]':
            props.overlapContent === false,
        },
        props.class,
      )}
      options={{
        ...props.options,
        scrollbars: {
          ...options.scrollbars,
          ...defaultScrollbarOptions.scrollbars,
        },
        paddingAbsolute: props.overlapContent === false,
      }}
      events={{
        // this seems to be the most reliable way to get the instance vs using the ref property
        initialized: (instance: OverlayScrollbars) => {
          if (!props.ref) {
            return;
          }

          props.ref(instance);
        },
        updated: (instance: OverlayScrollbars) => {
          // we do this is the updated as only after this event do we know the styles are correct
          setIsReady(true);
        },
        destroyed: () => {
          if (!props.ref) {
            return;
          }

          props.ref(undefined);
        },
      }}
    >
      <div class="h-full w-full">{contentAsVariable()}</div>
    </OverlayScrollbarsComponent>
  );
};

export default ScrollArea;
