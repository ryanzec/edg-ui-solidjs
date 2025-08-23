import { debounce } from 'lodash';
import type { JSX } from 'solid-js';
import { createEffect, createSignal, mergeProps, onCleanup, onMount, useContext } from 'solid-js';
import { ScrollAreaContext } from '$/core/components/scroll-area';
import type { ComponentRef } from '$/core/stores/component-ref';
import { domUtils, ViewCutoffLocation } from '$/core/utils/dom';
import { loggerUtils } from '$/core/utils/logger';

export const AutoScrollState = {
  ENABLED: 'enabled',
  DISABLED: 'disabled',
  FORCE_DISABLED: 'force-disabled',
} as const;

export type AutoScrollState = (typeof AutoScrollState)[keyof typeof AutoScrollState];

export type AutoScrollScrollToBottomOptions = {
  onlyIfEnabled?: boolean;
};

export type AutoScrollAreaComponentRef = {
  setAutoScrollState: (state: AutoScrollState) => void;
  scrollToBottom: (option?: AutoScrollScrollToBottomOptions) => void;
};

export type AutoScrollAreaProps = {
  class?: string;
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

  const scrollToBottom = (options: AutoScrollScrollToBottomOptions = {}) => {
    if (options.onlyIfEnabled === true && autoScrollState() !== AutoScrollState.ENABLED) {
      return;
    }

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

  const handleScroll = debounce(() => {
    // if our programmatic method to triggering scrolling was used, we need to make sure we clear that state
    setProgrammaticallyScrolling(false);
  }, 150);

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
      loggerUtils.log('there is no scroll element or check element so cant setup auto scroll');

      return;
    }

    const scrollParentElement = domUtils.getScrollParent(currentScrollElement, scrollAreaContext !== undefined);

    if (!scrollParentElement) {
      loggerUtils.log('the scroll element has not scrollable parent so cant setup auto scroll');

      return;
    }

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
        // a smaller buffer
        rootMargin: '10px',
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
    <div data-id="auto-scroll-area" ref={setScrollElement} class={props.class}>
      {props.children}
      <div ref={setCheckElement} class="h-[1px] opacity-0 pointer-events-none" />
    </div>
  );
};

export default AutoScrollArea;
