import getScrollParent from 'scrollparent';
import { type Accessor, createEffect, createSignal, onCleanup, type Setter } from 'solid-js';
import { domUtils, ViewCutoffLocation } from '$/core/utils/dom';

type CreateLoadMoreDataStoreOptions = {
  loadMoreData?: () => Promise<void>;
};

export type LoadMoreDataStore = {
  setAutoLoadTriggerElementRef: Setter<HTMLDivElement | undefined>;
  isLoading: Accessor<boolean>;
};

type PositionChangeData = {
  element: Element;
  isVisible: boolean;
  visibilityRatio: number;
};

type PositionCallback = (data: PositionChangeData) => void;

const registerObserver = (element: Element, callback: PositionCallback) => {
  const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
    for (const entry of entries) {
      callback({
        element: entry.target,
        isVisible: entry.isIntersecting,
        visibilityRatio: entry.intersectionRatio,
      });
    }
  });

  observer.observe(element);

  return () => {
    observer.disconnect();
  };
};

const createLoadMoreDataStore = (options: CreateLoadMoreDataStoreOptions): LoadMoreDataStore => {
  const [autoLoadTriggerElementRef, setAutoLoadTriggerElementRef] = createSignal<HTMLDivElement>();
  const [isLoading, setIsLoading] = createSignal(false);

  const loadMoreData = async (): Promise<boolean> => {
    try {
      if (!options.loadMoreData || isLoading()) {
        return false;
      }

      const currentAutoLoadTriggerElement = autoLoadTriggerElementRef();

      if (!currentAutoLoadTriggerElement) {
        return false;
      }

      const currentScrollParentElement = getScrollParent(currentAutoLoadTriggerElement);

      if (!currentScrollParentElement || !currentAutoLoadTriggerElement) {
        return false;
      }

      const elementInView = domUtils.elementInView(currentScrollParentElement, currentAutoLoadTriggerElement);

      if (elementInView !== ViewCutoffLocation.NONE) {
        return false;
      }

      setIsLoading(true);

      await options.loadMoreData();

      setIsLoading(false);

      return true;
    } catch (error: unknown) {
      setIsLoading(false);

      throw error;
    }
  };

  createEffect(function registerObserverEffect() {
    const currentAutoLoadTriggerElement = autoLoadTriggerElementRef();

    if (!currentAutoLoadTriggerElement) {
      return;
    }

    const uncleanup = registerObserver(currentAutoLoadTriggerElement, async (data) => {
      if (!data.isVisible) {
        return;
      }

      let loadedData = await loadMoreData();

      // if we loadded data it is possible that evey after the new data is loaded there is still room for more so we
      // we have to keep loading more data until there is no more room for more data
      while (loadedData) {
        loadedData = await loadMoreData();
      }
    });

    onCleanup(() => {
      uncleanup();
    });
  });

  return {
    setAutoLoadTriggerElementRef,
    isLoading,
  };
};

export const loadMoreDataStoreUtils = {
  createStore: createLoadMoreDataStore,
};
