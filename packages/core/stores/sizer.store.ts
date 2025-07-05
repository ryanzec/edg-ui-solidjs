import { type Accessor, type Setter, createSignal } from 'solid-js';

export type SizerStore = {
  elementRef: Accessor<HTMLDivElement | undefined>;
  setElementRef: Setter<HTMLDivElement | undefined>;
  handleWindowMouseMove: (event: MouseEvent) => void;
  handleWindowMouseUp: () => void;
  setupResizeEvents: () => void;
};

export const createSizerStore = (): SizerStore => {
  let xResizeLeft = 0;
  let isDragging = false;
  let dragXStart = 0;
  let dragWidthStart = 0;

  const [elementRef, setElementRef] = createSignal<HTMLDivElement>();

  const handleWindowMouseMove = (event: MouseEvent) => {
    const currentElementRef = elementRef();

    if (!currentElementRef) {
      return;
    }

    const moveDiff = event.pageX - dragXStart;

    currentElementRef.style.width = `${dragWidthStart + moveDiff * -1}px`;
  };

  const handleWindowMouseUp = () => {
    isDragging = false;
    document.body.style.userSelect = 'initial';
    document.body.style.cursor = 'auto';

    window.removeEventListener('mouseup', handleWindowMouseUp);
    window.removeEventListener('mousemove', handleWindowMouseMove);
  };

  const handleElementMouseDown = (event: MouseEvent) => {
    const currentElementRef = elementRef();

    if (!currentElementRef) {
      return;
    }

    const elementBoundingRect = currentElementRef.getBoundingClientRect();

    xResizeLeft = elementBoundingRect.x;
    isDragging = event.pageX >= xResizeLeft && event.pageX <= xResizeLeft + 5;

    if (!isDragging) {
      return;
    }

    dragXStart = event.pageX;
    dragWidthStart = elementBoundingRect.width;

    document.body.style.userSelect = 'none';

    window.addEventListener('mouseup', handleWindowMouseUp);
    window.addEventListener('mousemove', handleWindowMouseMove);
  };

  const handleElementMouseMove = (event: MouseEvent) => {
    const currentElementRef = elementRef();

    if (!currentElementRef) {
      return;
    }

    xResizeLeft = currentElementRef.getBoundingClientRect().x;

    const isDraggingArea = event.pageX >= xResizeLeft && event.pageX <= xResizeLeft + 5;

    if (!isDraggingArea) {
      document.body.style.cursor = 'auto';

      return;
    }

    document.body.style.cursor = 'ew-resize';
  };

  const setupResizeEvents = () => {
    const currentElementRef = elementRef();

    if (!currentElementRef) {
      return;
    }

    currentElementRef.addEventListener('mousemove', handleElementMouseMove);
    currentElementRef.addEventListener('mousedown', handleElementMouseDown);
  };

  return {
    handleWindowMouseUp,
    handleWindowMouseMove,
    setupResizeEvents,
    elementRef,
    setElementRef,
  };
};

export const sizerStoreUtils = {
  createStore: createSizerStore,
};
