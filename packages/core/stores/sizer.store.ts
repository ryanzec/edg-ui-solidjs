import { type Accessor, type Setter, createSignal, splitProps } from 'solid-js';

const CURSOR_CHANGE_OFFSET = 5;

export type SizerStore = {
  elementRef: Accessor<HTMLDivElement | undefined>;
  setElementRef: Setter<HTMLDivElement | undefined>;
  handleWindowMouseMove: (event: MouseEvent) => void;
  handleWindowMouseUp: () => void;
  setupResizeEvents: () => void;
};

export type CreateSizerStoreOptions = {
  resizeFromSide?: 'left' | 'right';
  syncSizeWithMovement?: boolean;
  onSizeChanged?: (startSize: number, newSize: number, moveDifference: number) => void;
};

export const createSizerStore = (options: CreateSizerStoreOptions = {}): SizerStore => {
  const [callbacks, restOfOptions] = splitProps(options, ['onSizeChanged']);

  const finalOptions = Object.assign<CreateSizerStoreOptions, CreateSizerStoreOptions>(
    { resizeFromSide: 'left', syncSizeWithMovement: true },
    structuredClone(restOfOptions),
  );

  let xResizeLeft = 0;
  let xResizeRight = 0;
  let isDragging = false;
  let dragXStart = 0;
  let dragWidthStart = 0;

  const [elementRef, setElementRef] = createSignal<HTMLDivElement>();

  const handleWindowMouseMove = (event: MouseEvent) => {
    const currentElementRef = elementRef();

    if (!currentElementRef) {
      return;
    }

    const moveDifference = event.pageX - dragXStart;

    // when moving from the left the size change is inversed to the movement
    const moveMultiplier = finalOptions.resizeFromSide === 'left' ? -1 : 1;
    const newWidth = dragWidthStart + moveDifference * moveMultiplier;

    if (finalOptions.syncSizeWithMovement) {
      currentElementRef.style.width = `${newWidth}px`;
    }

    callbacks.onSizeChanged?.(dragWidthStart, newWidth, moveDifference);
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
    xResizeRight = elementBoundingRect.x + elementBoundingRect.width;

    isDragging =
      finalOptions.resizeFromSide === 'right'
        ? event.pageX >= xResizeRight - CURSOR_CHANGE_OFFSET && event.pageX <= xResizeRight
        : event.pageX >= xResizeLeft && event.pageX <= xResizeLeft + CURSOR_CHANGE_OFFSET;

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

    if (isDragging) {
      document.body.style.cursor = 'ew-resize';

      return;
    }

    const elementBoundingRect = currentElementRef.getBoundingClientRect();

    xResizeLeft = elementBoundingRect.x;
    xResizeRight = elementBoundingRect.x + elementBoundingRect.width;

    const isDraggingArea =
      finalOptions.resizeFromSide === 'right'
        ? event.pageX >= xResizeRight - CURSOR_CHANGE_OFFSET && event.pageX <= xResizeRight
        : event.pageX >= xResizeLeft && event.pageX <= xResizeLeft + CURSOR_CHANGE_OFFSET;

    if (!isDraggingArea) {
      document.body.style.cursor = 'auto';

      return;
    }

    document.body.style.cursor = 'ew-resize';
  };

  const handleElementMouseLeave = () => {
    if (isDragging) {
      return;
    }

    document.body.style.cursor = 'auto';
  };

  const setupResizeEvents = () => {
    const currentElementRef = elementRef();

    if (!currentElementRef) {
      return;
    }

    currentElementRef.addEventListener('mousemove', handleElementMouseMove);
    currentElementRef.addEventListener('mousedown', handleElementMouseDown);
    currentElementRef.addEventListener('mouseleave', handleElementMouseLeave);
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
