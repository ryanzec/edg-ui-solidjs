import { ScrollAreaContext } from '$/core/components/scroll-area';
import type { ComponentRef } from '$/core/stores/component-ref';
import { ViewCutoffLocation, domUtils } from '$/core/utils/dom';
import { debounce } from 'lodash';
import type { JSX } from 'solid-js';
import { createEffect, createSignal, mergeProps, onCleanup, onMount, useContext } from 'solid-js';

export const AutoScrollState = {
  ENABLED: 'enabled',
  DISABLED: 'disabled',
  FORCE_DISABLED: 'force-disabled',
} as const;

export type AutoScrollState = (typeof AutoScrollState)[keyof typeof AutoScrollState];

export type AutoScrollAreaComponentRef = {
  setAutoScrollState: (state: AutoScrollState) => void;
  scrollToBottom: () => void;
};

export type AutoScrollAreaProps = {
  children: JSX.Element;
  defaultState?: AutoScrollState;
  autoScrollAreaComponentRef?: ComponentRef<AutoScrollAreaComponentRef>;
};

const AutoScrollArea = (passedProps: AutoScrollAreaProps) => {
  const props = mergeProps({ defaultState: AutoScrollState.DISABLED }, passedProps);

  const [checkElement, setCheckElement] = createSignal<HTMLElement>();
  const [scrollElement, setScrollElement] = createSignal<HTMLElement>();
  const [autoScrollState, setAutoScrollState] = createSignal<AutoScrollState>(props.defaultState);
  const [programmaticallyScrolling, setProgrammaticallyScrolling] = createSignal(false);
  const [pendingScroll, setPendingScroll] = createSignal(false);

  const scrollAreaContext = useContext(ScrollAreaContext);

  const handleScroll = debounce(() => {
    // if our programmatic method to triggering scrolling was used, we need to make sure we clear that state
    setProgrammaticallyScrolling(false);
  }, 150);

  const scrollToBottom = () => {
    const currentCheckElement = checkElement();
    const currentScrollElement = scrollElement();

    if (!currentCheckElement || !currentScrollElement) {
      return;
    }

    const scrollParentElement = domUtils.getScrollParent(currentScrollElement, scrollAreaContext !== undefined);

    if (!scrollParentElement) {
      return;
    }

    const elementInView = domUtils.elementInView(scrollParentElement, currentCheckElement);

    if (elementInView === ViewCutoffLocation.NONE) {
      return;
    }

    // this allow use to tell the difference between an automatic scrolling effect and a user scrolling effect
    setProgrammaticallyScrolling(true);
    setPendingScroll(true);

    // it is usefult o do this in an animation frame to help ensure the dom is fully updated
    requestAnimationFrame(() => {
      currentCheckElement.scrollIntoView({ behavior: 'smooth' });
    });
  };

  createEffect(function toggleAutoScroll() {
    if (scrollAreaContext && scrollAreaContext.isReady() === false) {
      return;
    }

    const currentScrollElement = scrollElement();

    const scrollParentElement = currentScrollElement
      ? domUtils.getScrollParent(currentScrollElement, scrollAreaContext !== undefined)
      : undefined;

    if (!currentScrollElement || !scrollParentElement) {
      return;
    }

    scrollParentElement.addEventListener('scroll', handleScroll);
    scrollParentElement.childNodes;

    onCleanup(() => {
      scrollParentElement.removeEventListener('scroll', handleScroll);
    });
  });

  onMount(() => {
    const currentScrollElement = scrollElement();
    const currentCheckElement = checkElement();

    if (!currentScrollElement || !currentCheckElement) {
      return;
    }

    const scrollParentElement = domUtils.getScrollParent(currentScrollElement, scrollAreaContext !== undefined);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (autoScrollState() === AutoScrollState.FORCE_DISABLED) {
          return;
        }

        const entry = entries[0];
        const startingAutoScrollEnabled = autoScrollState() === AutoScrollState.ENABLED;
        const currentProgrammaticallyScroll = programmaticallyScrolling();

        if (currentProgrammaticallyScroll === false) {
          setAutoScrollState(entry.isIntersecting ? AutoScrollState.ENABLED : AutoScrollState.DISABLED);
        }

        const currentAutoScrollEnabled = autoScrollState() === AutoScrollState.ENABLED;

        if (startingAutoScrollEnabled === false && currentAutoScrollEnabled && pendingScroll()) {
          setPendingScroll(false);
          scrollToBottom();
        }
      },
      {
        root: scrollParentElement,
        // considered in view threshold
        threshold: 0.1,
        // this add a small buffer around the "viewport" (the root element) to avoid any edge case issue with proper
        // detection
        rootMargin: '0px 0px -10px 0px',
      },
    );

    intersectionObserver.observe(currentCheckElement);

    const resizeObserver = new ResizeObserver(() => {
      if (autoScrollState() === AutoScrollState.ENABLED) {
        scrollToBottom();
      } else {
        setPendingScroll(true);
      }
    });

    resizeObserver.observe(currentScrollElement);

    props.autoScrollAreaComponentRef?.onReady({
      setAutoScrollState,
      scrollToBottom,
    });

    onCleanup(() => {
      intersectionObserver.disconnect();
      props.autoScrollAreaComponentRef?.onCleanup();
    });
  });

  return (
    <>
      <div ref={setScrollElement}>
        {props.children}
        <div ref={setCheckElement} class="h-[1px] opacity-0 pointer-events-none" />
      </div>
    </>
  );
};

export default AutoScrollArea;
