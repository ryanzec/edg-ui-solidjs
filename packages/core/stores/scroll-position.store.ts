import { debounce } from 'lodash';
import { type Accessor, createEffect, createSignal, on } from 'solid-js';

export type ScrollPosition = {
  x: number;
  y: number;
};

export type ScrollPositionStore = {
  scrollPosition: Accessor<ScrollPosition>;
  trackedElement: Accessor<HTMLElement | undefined>;
};

export type ScrollPositionStoreOptions = {
  trackingElement: Accessor<HTMLElement | undefined>;
};

const createStore = (options: ScrollPositionStoreOptions): ScrollPositionStore => {
  const [scrollPosition, setScrollPosition] = createSignal<ScrollPosition>({ x: 0, y: 0 });

  createEffect(
    on(
      () => [options.trackingElement()],
      () => {
        const currentElement = options.trackingElement();

        if (!currentElement) {
          return;
        }

        setScrollPosition({ x: currentElement?.scrollLeft || 0, y: currentElement?.scrollTop || 0 });

        const handleScroll = debounce(() => {
          setScrollPosition({ x: currentElement?.scrollLeft || 0, y: currentElement?.scrollTop || 0 });
        }, 10);

        currentElement?.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
          currentElement?.removeEventListener('scroll', handleScroll);
          handleScroll.cancel();
        };
      },
    ),
  );

  return { scrollPosition, trackedElement: options.trackingElement };
};

export const scrollPositionStoreUtils = {
  createStore,
};
