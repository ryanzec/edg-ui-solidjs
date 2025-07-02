import 'overlayscrollbars/overlayscrollbars.css';

import type { OverlayScrollbars, PartialOptions } from 'overlayscrollbars';

import { OverlayScrollbarsComponent, type OverlayScrollbarsComponentProps } from 'overlayscrollbars-solid';
import { type Setter, children, splitProps } from 'solid-js';

import styles from '$/core/components/scroll-area/scroll-area.module.css';
import classnames from 'classnames';

const defaultScrollbarOptions: PartialOptions = {
  scrollbars: {
    autoHideDelay: 100,
  },
};

const ScrollArea = (
  passedProps: Omit<OverlayScrollbarsComponentProps, 'ref'> & { ref?: Setter<OverlayScrollbars | undefined> },
) => {
  const [props] = splitProps(passedProps, ['options', 'class', 'children', 'ref']);
  const options = props.options || {};

  // @todo(refactor) this is to work around a bug in OverlayScrollbars that cause a double render of content
  // @todo(refactor) depending if the top element wrapped uses a signal
  // @todo(refactor) reference: https://github.com/KingSora/OverlayScrollbars/issues/700
  const contentAsVariable = children(() => props.children);

  return (
    <OverlayScrollbarsComponent
      defer
      class={classnames(styles.scrollArea, props.class)}
      options={{
        ...props.options,
        scrollbars: {
          ...options.scrollbars,
          ...defaultScrollbarOptions.scrollbars,
        },
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
      {contentAsVariable()}
    </OverlayScrollbarsComponent>
  );
};

export default ScrollArea;
