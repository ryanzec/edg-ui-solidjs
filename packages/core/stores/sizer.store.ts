import { type Accessor, type Setter, createSignal, splitProps } from 'solid-js';

const CURSOR_CHANGE_OFFSET = 10;

export type SizerStore = {
  elementRef: Accessor<HTMLDivElement | undefined>;
  setElementRef: Setter<HTMLDivElement | undefined>;
  isResizing: Accessor<boolean>;
  isInResizeArea: Accessor<boolean>;
  handleWindowMouseMove: (event: MouseEvent) => void;
  handleWindowMouseUp: () => void;
  setupResizeEvents: () => void;
};

export type CreateSizerStoreOptions = {
  resizeFromSide?: 'left' | 'right';
  syncSizeWithMovement?: boolean;
  onSizeChanged?: (startSize: number, newSize: number, moveDifference: number) => void;
  onMouseEnterResizeArea?: () => void;
  onMouseLeaveResizeArea?: () => void;
  onResizeStarted?: () => void;
  onResizeEnded?: () => void;
};

export const createSizerStore = (options: CreateSizerStoreOptions = {}): SizerStore => {
  const [callbacks, restOfOptions] = splitProps(options, [
    'onSizeChanged',
    'onMouseEnterResizeArea',
    'onMouseLeaveResizeArea',
    'onResizeStarted',
    'onResizeEnded',
  ]);

  const finalOptions = Object.assign<CreateSizerStoreOptions, CreateSizerStoreOptions>(
    { resizeFromSide: 'left', syncSizeWithMovement: true },
    structuredClone(restOfOptions),
  );

  let xResizeLeft = 0;
  let xResizeRight = 0;
  let dragXStart = 0;
  let dragWidthStart = 0;

  const [elementRef, setElementRef] = createSignal<HTMLDivElement>();
  const [isResizing, setIsResizing] = createSignal<boolean>(false);
  const [isInResizeArea, setIsInResizeArea] = createSignal<boolean>(false);

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
    setIsResizing(false);
    document.body.style.userSelect = 'initial';
    document.body.style.cursor = 'auto';

    window.removeEventListener('mouseup', handleWindowMouseUp);
    window.removeEventListener('mousemove', handleWindowMouseMove);

    callbacks.onResizeEnded?.();
  };

  const handleElementMouseDown = (event: MouseEvent) => {
    const currentElementRef = elementRef();

    if (!currentElementRef) {
      return;
    }

    const elementBoundingRect = currentElementRef.getBoundingClientRect();

    xResizeLeft = elementBoundingRect.x;
    xResizeRight = elementBoundingRect.x + elementBoundingRect.width;

    const newIsResizing =
      finalOptions.resizeFromSide === 'right'
        ? event.pageX >= xResizeRight - CURSOR_CHANGE_OFFSET && event.pageX <= xResizeRight
        : event.pageX >= xResizeLeft && event.pageX <= xResizeLeft + CURSOR_CHANGE_OFFSET;

    setIsResizing(newIsResizing);

    if (!newIsResizing) {
      return;
    }

    callbacks.onResizeStarted?.();
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

    if (isResizing()) {
      document.body.style.cursor = 'col-resize';

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
      setIsInResizeArea(false);
      callbacks.onMouseLeaveResizeArea?.();
      document.body.style.cursor = 'auto';

      return;
    }

    setIsInResizeArea(true);
    callbacks.onMouseEnterResizeArea?.();
    document.body.style.cursor = 'col-resize';
  };

  const handleElementMouseLeave = () => {
    setIsInResizeArea(false);

    if (isResizing()) {
      return;
    }

    callbacks.onMouseLeaveResizeArea?.();
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
    isResizing,
    isInResizeArea: () => isResizing() || isInResizeArea(),
  };
};

export const sizerStoreUtils = {
  createStore: createSizerStore,
};
