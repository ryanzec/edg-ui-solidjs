import { tailwindUtils } from '$/core/utils/tailwind';
import { type JSX, Show, createSignal, mergeProps, onCleanup, splitProps } from 'solid-js';

import Overlay from '$/core/components/overlay';
import styles from '$/core/components/peek/peek.module.css';
import type { PeekStore } from '$/core/components/peek/utils';
import type { CommonDataAttributes } from '$/core/types/generic';
import { Portal } from 'solid-js/web';

export type PeekProps = JSX.HTMLAttributes<HTMLDivElement> &
  CommonDataAttributes & {
    peekStore: PeekStore;
    hasOverlay?: boolean;
    closeOnClickOverlay?: boolean;
    closeOnEscape?: boolean;
    closeEnabled?: boolean;
    isResizable?: boolean;
  };

const Peek = (passedProps: PeekProps) => {
  const [props, restOfProps] = splitProps(
    mergeProps(
      { hasOverlay: true, closeOnClickOverlay: false, closeOnEscape: true, isResizable: false, closeEnabled: true },
      passedProps,
    ),
    [
      'children',
      'class',
      'hasOverlay',
      'closeOnClickOverlay',
      'peekStore',
      'isResizable',
      'closeOnEscape',
      'closeEnabled',
    ],
  );

  const [peekElementRef, setPeekElementRef] = createSignal<HTMLDivElement>();

  let xResizeLeft = 0;
  let isDragging = false;
  let dragXStart = 0;
  let dragWidthStart = 0;

  const handleClickOverlay = () => {
    if (props.closeEnabled === false || props.closeOnClickOverlay === false) {
      return;
    }

    props.peekStore.close();
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (props.closeEnabled === false || props.closeOnEscape === false || event.key !== 'Escape') {
      return;
    }

    props.peekStore.close();
  };

  const handleWindowMouseMove = (event: MouseEvent) => {
    const currentPeekElementRef = peekElementRef();

    if (!currentPeekElementRef) {
      return;
    }

    const moveDiff = event.pageX - dragXStart;

    currentPeekElementRef.style.width = `${dragWidthStart + moveDiff * -1}px`;
  };

  const handleWindowMouseUp = () => {
    isDragging = false;
    document.body.style.userSelect = 'initial';
    document.body.style.cursor = 'auto';

    window.removeEventListener('mouseup', handleWindowMouseUp);
    window.removeEventListener('mousemove', handleWindowMouseMove);
  };

  const handlePeekMouseDown = (event: MouseEvent) => {
    const currentPeekElementRef = peekElementRef();

    if (!currentPeekElementRef) {
      return;
    }

    const peekBoundingRect = currentPeekElementRef.getBoundingClientRect();

    xResizeLeft = peekBoundingRect.x;
    isDragging = event.pageX >= xResizeLeft && event.pageX <= xResizeLeft + 5;

    if (!isDragging) {
      return;
    }

    dragXStart = event.pageX;
    dragWidthStart = peekBoundingRect.width;

    document.body.style.userSelect = 'none';

    window.addEventListener('mouseup', handleWindowMouseUp);
    window.addEventListener('mousemove', handleWindowMouseMove);
  };

  const handlePeekMouseMove = (event: MouseEvent) => {
    const currentPeekElementRef = peekElementRef();

    if (!currentPeekElementRef) {
      return;
    }

    xResizeLeft = currentPeekElementRef.getBoundingClientRect().x;

    const isDraggingArea = event.pageX >= xResizeLeft && event.pageX <= xResizeLeft + 5;

    if (!isDraggingArea) {
      document.body.style.cursor = 'auto';

      return;
    }

    document.body.style.cursor = 'ew-resize';
  };

  const handlePeekClose = () => {
    if (props.closeEnabled === false) {
      return;
    }

    props.peekStore.close();
  };

  const setupCloseEvents = (element: HTMLElement) => {
    const closeElements = element.querySelectorAll('[data-peek-close="true"]');

    for (const closeElement of closeElements) {
      closeElement.addEventListener('click', handlePeekClose);
    }
  };

  const setupResizeEvents = (element: HTMLElement) => {
    if (props.isResizable === false) {
      return;
    }

    element.addEventListener('mousemove', handlePeekMouseMove);
    element.addEventListener('mousedown', handlePeekMouseDown);
  };

  const peekRef = (element: HTMLDivElement) => {
    setPeekElementRef(element);

    document.addEventListener('keydown', handleKeyUp);

    queueMicrotask(() => {
      setupCloseEvents(element);
      setupResizeEvents(element);
    });

    onCleanup(() => {
      document.removeEventListener('keydown', handleKeyUp);
    });
  };

  return (
    <Show when={props.peekStore.isOpened()}>
      <Portal>
        <div data-id="peek">
          <div ref={peekRef} {...restOfProps} class={tailwindUtils.merge(styles.peek, props.class)}>
            {props.children}
          </div>
          <Show when={props.hasOverlay}>
            <Overlay onClick={handleClickOverlay} />
          </Show>
        </div>
      </Portal>
    </Show>
  );
};

export default Peek;
