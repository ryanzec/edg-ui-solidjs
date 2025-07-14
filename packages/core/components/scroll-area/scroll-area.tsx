import 'overlayscrollbars/overlayscrollbars.css';

import type { OverlayScrollbars, PartialOptions } from 'overlayscrollbars';

import { OverlayScrollbarsComponent, type OverlayScrollbarsComponentProps } from 'overlayscrollbars-solid';
import { type Setter, children, mergeProps, splitProps } from 'solid-js';

import styles from '$/core/components/scroll-area/scroll-area.module.css';
import { tailwindUtils } from '$/core/utils/tailwind';

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
  const options = props.options || {};

  // @todo(refactor) this is to work around a bug in OverlayScrollbars that cause a double render of content
  // @todo(refactor) depending if the top element wrapped uses a signal
  // @todo(refactor) reference: https://github.com/KingSora/OverlayScrollbars/issues/700
  const contentAsVariable = children(() => props.children);

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
