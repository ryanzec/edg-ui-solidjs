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
  const scrollAreaContext = useContext(ScrollAreaContext);

  const handleScroll = debounce(() => {
    if (autoScrollState() === AutoScrollState.FORCE_DISABLED) {
      return;
    }

    const currentScrollElement = scrollElement();
    const currentCheckElement = checkElement();

    if (!currentScrollElement || !currentCheckElement) {
      return;
    }

    const parentScrollElement = domUtils.getScrollParent(currentScrollElement, scrollAreaContext !== undefined);

    if (!parentScrollElement) {
      return;
    }

    const checkElementInView =
      domUtils.elementInView(parentScrollElement, currentCheckElement) === ViewCutoffLocation.NONE;

    setAutoScrollState(checkElementInView ? AutoScrollState.ENABLED : AutoScrollState.DISABLED);
  }, 0);

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

    currentCheckElement.scrollIntoView({ behavior: 'smooth' });
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

    if (!currentScrollElement) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      const currentAutoScrollState = autoScrollState();
      console.log('current: ', currentAutoScrollState);

      if (
        currentAutoScrollState === AutoScrollState.DISABLED ||
        currentAutoScrollState === AutoScrollState.FORCE_DISABLED
      ) {
        return;
      }

      scrollToBottom();

      console.log('auto scroll', currentAutoScrollState);
    });

    observer.observe(currentScrollElement);

    props.autoScrollAreaComponentRef?.onReady({
      setAutoScrollState,
      scrollToBottom,
    });

    onCleanup(() => {
      observer.disconnect();
      props.autoScrollAreaComponentRef?.onCleanup();
    });
  });

  return (
    <>
      <div ref={setScrollElement}>
        {props.children}
        <div ref={setCheckElement} />
      </div>
    </>
  );
};

export default AutoScrollArea;
