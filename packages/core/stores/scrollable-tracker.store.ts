import { type Accessor, createEffect, createSignal, onCleanup } from 'solid-js';
import { domUtils } from '../utils/dom';

export const scrollableTrackerDataAttribute = {
  IS_SCROLLABLE: 'data-scrollable',
};

export type ScrollableTrackerStore = {
  dataIsScrollable: Accessor<boolean>;
};

type CreateScrollableTrackerStoreOptions = {
  trackingElement: Accessor<HTMLElement | undefined>;
};

const createScrollableTrackerStore = (options: CreateScrollableTrackerStoreOptions): ScrollableTrackerStore => {
  const [dataIsScrollable, setDataIsScrollable] = createSignal<boolean>(false);

  const updateDataIsScrollable = () => {
    const currentTableDataContainerElement = options.trackingElement();

    if (!currentTableDataContainerElement) {
      return;
    }

    const isScrollable = domUtils.isElementScrollable(currentTableDataContainerElement);

    console.log('isScrollable', isScrollable);

    options.trackingElement()?.setAttribute(scrollableTrackerDataAttribute.IS_SCROLLABLE, isScrollable.y.toString());

    setDataIsScrollable(isScrollable.y);
  };

  createEffect(() => {
    const currentTableDataContainerElement = options.trackingElement();

    if (!currentTableDataContainerElement) {
      return;
    }

    updateDataIsScrollable();

    const resizeObserver = new ResizeObserver((entries) => {
      if (entries.length === 0) {
        return;
      }

      updateDataIsScrollable();
    });

    resizeObserver.observe(currentTableDataContainerElement);

    const mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type !== 'childList' || (mutation.addedNodes.length === 0 && mutation.removedNodes.length > 0)) {
          continue;
        }

        updateDataIsScrollable();
      }
    });

    mutationObserver.observe(currentTableDataContainerElement, {
      childList: true,
      subtree: true,
    });

    onCleanup(() => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    });
  });

  return {
    dataIsScrollable,
  };
};

export const scrollableTrackerStoreUtils = {
  createStore: createScrollableTrackerStore,
};
