import { domUtils } from '$/core/utils/dom';
import { ViewCutoffLocation } from '$/core/utils/dom';
import getScrollParent from 'scrollparent';
import { type Accessor, type Setter, createEffect, createSignal, onCleanup } from 'solid-js';

type CreateLoadMoreDataStoreOptions = {
  loadMoreData?: () => Promise<void>;
};

export type LoadMoreDataStoreInstance = {
  setAutoLoadTriggerElement: Setter<HTMLDivElement | undefined>;
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

const createStore = (options: CreateLoadMoreDataStoreOptions): LoadMoreDataStoreInstance => {
  const [autoLoadTriggerElement, setAutoLoadTriggerElement] = createSignal<HTMLDivElement>();
  const [isLoading, setIsLoading] = createSignal(false);

  const loadMoreData = async (): Promise<boolean> => {
    try {
      if (!options.loadMoreData || isLoading()) {
        return false;
      }

      const currentAutoLoadTriggerElement = autoLoadTriggerElement();

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
    const currentAutoLoadTriggerElement = autoLoadTriggerElement();

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
    setAutoLoadTriggerElement,
    isLoading,
  };
};

export const loadMoreDataStoreUtils = {
  createStore,
};
