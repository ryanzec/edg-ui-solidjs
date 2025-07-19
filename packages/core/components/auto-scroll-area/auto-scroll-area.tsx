import { ScrollAreaContext } from '$/core/components/scroll-area';
import type { ComponentRef } from '$/core/stores/component-ref';
import { ViewCutoffLocation, domUtils } from '$/core/utils/dom';
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
  const [previousTopOffset, setPreviousTopOffset] = createSignal<number>();
  const scrollAreaContext = useContext(ScrollAreaContext);

  const handleScroll = () => {
    if (autoScrollState() === AutoScrollState.FORCE_DISABLED) {
      return;
    }

    const currentScrollElement = scrollElement();
    const currentPreviousTop = previousTopOffset();

    if (!currentScrollElement) {
      return;
    }

    const parentScrollElement = domUtils.getScrollParent(currentScrollElement, scrollAreaContext !== undefined);

    if (!parentScrollElement) {
      return;
    }

    const offsets = domUtils.getAllOffsets(parentScrollElement, checkElement());
    const topOffsetChange = currentPreviousTop === undefined ? 0 : offsets.bottom - currentPreviousTop;

    setPreviousTopOffset(offsets.bottom);

    if (topOffsetChange <= 0) {
      setAutoScrollState(AutoScrollState.DISABLED);

      return;
    }

    // since the check element is not in view, we don't re-enable the auto scroll
    if (offsets.bottom < 0 || autoScrollState() === AutoScrollState.ENABLED) {
      return;
    }
    // @todo(research) the reason this works is because while it get disabled when new content is added, the scroll
    // @todo(research) into view is trigger which scrolls back to the bottom re-enabling it. It feels that might be a
    // @todo(research) flacky solution but it seems to work and I don't know of an alternative
    setAutoScrollState(AutoScrollState.ENABLED);
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

      if (
        currentAutoScrollState === AutoScrollState.DISABLED ||
        currentAutoScrollState === AutoScrollState.FORCE_DISABLED
      ) {
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

      currentCheckElement.scrollIntoView({ behavior: 'smooth' });
    });

    observer.observe(currentScrollElement);

    props.autoScrollAreaComponentRef?.onReady({
      setAutoScrollState,
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
