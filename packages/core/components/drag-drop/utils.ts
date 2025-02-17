import type { DropTargetRecord, ElementDragType } from '@atlaskit/pragmatic-drag-and-drop/types';
import type { JSX } from 'solid-js';
import { createStore, produce } from 'solid-js/store';

export const dragDropDataAttribute = {
  IS_DRAGGING: 'data-is-dragging',
  IS_DRAGGABLE: 'data-is-draggable',
  IS_DROPPING: 'data-is-dropping',
  IS_DROPPABLE: 'data-is-droppable',
  DRAG_HANDLE: 'data-drag-handle',
};

export type DragDropElement = {
  id: string;
  // if you want the element to essentially be empty, just have this method return undefined
  element: () => JSX.Element;
  meta?: {
    // biome-ignore lint/suspicious/noExplicitAny: this is a generic so we need to allow any
    [key: string]: any;
  };
};

export type DragDropSingleListStore = {
  elements: () => DragDropElement[];
  swapItems: (index1: number, index2: number) => void;
  shiftItem: (shiftIndex: number, shiftTo: number) => void;
};

type CreateSingleListStoreOptions = {
  defaultElements?: DragDropElement[];
};

type DragDropSingleListStoreData = {
  elements: DragDropElement[];
};

const createSingleListStore = (options: CreateSingleListStoreOptions = {}): DragDropSingleListStore => {
  const [dragDropStore, setDragDropStore] = createStore<DragDropSingleListStoreData>({
    elements: options.defaultElements || [],
  });

  const swapItems = (index1: number, index2: number) => {
    setDragDropStore(
      produce((draft) => {
        const temp = draft.elements[index1];

        draft.elements[index1] = draft.elements[index2];
        draft.elements[index2] = temp;

        return draft;
      }),
    );
  };

  const shiftItem = (shiftIndex: number, shiftTo: number) => {
    setDragDropStore(
      produce((draft) => {
        const newElements = [...draft.elements];
        const temp = newElements.splice(shiftIndex, 1);

        newElements.splice(shiftTo, 0, ...temp);

        draft.elements = newElements;
      }),
    );
  };

  return {
    elements: () => dragDropStore.elements,
    swapItems,
    shiftItem,
  };
};

export type DragDropMultipleListStore = {
  elements: () => {
    [key: string]: DragDropElement[];
  };
  swapItems: (listId: string, index1: number, index2: number) => void;
  shiftItem: (listId: string, shiftIndex: number, shiftTo: number) => void;
  moveItem: (sourceListId: string, sourceItemId: DragDropElement, destinationListId: string) => void;
};

type CreateMultipleListStoreOptions = {
  defaultElements?: {
    [key: string]: DragDropElement[];
  };
};

type DragDropMultipleListStoreData = {
  elements: {
    [key: string]: DragDropElement[];
  };
};

const createMultipleListStore = (options: CreateMultipleListStoreOptions = {}): DragDropMultipleListStore => {
  const [dragDropStore, setDragDropStore] = createStore<DragDropMultipleListStoreData>({
    elements: options.defaultElements || {},
  });

  const swapItems = (listId: string, index1: number, index2: number) => {
    setDragDropStore(
      produce((draft) => {
        const temp = draft.elements[listId][index1];

        draft.elements[listId][index1] = draft.elements[listId][index2];
        draft.elements[listId][index2] = temp;

        return draft;
      }),
    );
  };

  const shiftItem = (listId: string, shiftIndex: number, shiftTo: number) => {
    setDragDropStore(
      produce((draft) => {
        const newListElements = [...draft.elements[listId]];
        const temp = newListElements.splice(shiftIndex, 1);

        newListElements.splice(shiftTo, 0, ...temp);

        draft.elements[listId] = newListElements;
      }),
    );
  };

  const moveItem = (sourceListId: string, sourceItemId: DragDropElement, destinationListId: string) => {
    if (!sourceListId || !destinationListId || sourceListId === destinationListId) {
      return;
    }

    setDragDropStore(
      produce((draft) => {
        draft.elements[sourceListId] = draft.elements[sourceListId].filter((item) => item.id !== sourceItemId.id);
        draft.elements[destinationListId].push(sourceItemId);

        return draft;
      }),
    );
  };

  return {
    elements: () => dragDropStore.elements,
    swapItems,
    shiftItem,
    moveItem,
  };
};

const isDroppingOnDraggable = (sourceElement: HTMLElement, destinationElement: HTMLElement) => {
  return (
    sourceElement.getAttribute(dragDropDataAttribute.IS_DRAGGABLE) === 'true' &&
    destinationElement.getAttribute(dragDropDataAttribute.IS_DRAGGABLE) === 'true' &&
    destinationElement.getAttribute(dragDropDataAttribute.IS_DROPPABLE) === 'true'
  );
};

const parseDestinationOrSource = (
  dragDropData: DropTargetRecord | ElementDragType['payload'],
  elements: DragDropElement[],
) => {
  const element = dragDropData.element as HTMLElement;
  const draggableId = dragDropData.data.draggableId as string;
  const droppableId = dragDropData.data.droppableId as string;
  const index = elements.findIndex((item) => item.id === draggableId);

  return {
    element,
    draggableId,
    droppableId,
    index,
  };
};

const parseDestinationAndSourceSingleList = (
  dropTarget: DropTargetRecord,
  elementDrag: ElementDragType['payload'],
  elements: DragDropElement[],
) => {
  const {
    element: destinationElement,
    draggableId: destinationDraggableId,
    droppableId: destinationDroppableId,
    index: destinationIndex,
  } = parseDestinationOrSource(dropTarget, elements);
  const {
    element: sourceElement,
    draggableId: sourceDraggableId,
    droppableId: sourceDroppableId,
    index: sourceIndex,
  } = parseDestinationOrSource(elementDrag, elements);

  return {
    destinationElement,
    destinationDraggableId,
    destinationDroppableId,
    destinationIndex,
    sourceElement,
    sourceDraggableId,
    sourceDroppableId,
    sourceIndex,
  };
};

const parseDestinationOrSourceMultipleList = (
  dragDropData: DropTargetRecord | ElementDragType['payload'],
  elementsList: {
    [key: string]: DragDropElement[];
  },
) => {
  const droppableId = dragDropData.data.droppableId as string;
  const elements = elementsList[droppableId];

  return parseDestinationOrSource(dragDropData, elements);
};

const parseDestinationAndSourceMultipleList = (
  dropTarget: DropTargetRecord,
  elementDrag: ElementDragType['payload'],
  elementsList: {
    [key: string]: DragDropElement[];
  },
) => {
  const {
    element: destinationElement,
    draggableId: destinationDraggableId,
    droppableId: destinationDroppableId,
    index: destinationIndex,
  } = parseDestinationOrSourceMultipleList(dropTarget, elementsList);
  const {
    element: sourceElement,
    draggableId: sourceDraggableId,
    droppableId: sourceDroppableId,
    index: sourceIndex,
  } = parseDestinationOrSourceMultipleList(elementDrag, elementsList);

  return {
    destinationElement,
    destinationDraggableId,
    destinationDroppableId,
    destinationIndex,
    sourceElement,
    sourceDraggableId,
    sourceDroppableId,
    sourceIndex,
  };
};

const isDraggable = (element: HTMLElement) => {
  return element.getAttribute(dragDropDataAttribute.IS_DRAGGABLE) === 'true';
};

export const dragDropComponentUtils = {
  createSingleListStore,
  createMultipleListStore,
  isDroppingOnDraggable,
  isDraggable,
  parseDestinationAndSourceSingleList,
  parseDestinationAndSourceMultipleList,
};
