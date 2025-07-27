import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { batch, For, onCleanup, onMount } from 'solid-js';
import DragDrop, { dragDropComponentUtils } from '$/core/components/drag-drop';
import styles from '$/core/components/drag-drop/drag-drop.sandbox.module.css';
import Icon, { IconSize } from '$/core/components/icon';
import { loggerUtils } from '$/core/utils/logger';

export default {
  title: 'Components/DragDrop',
};

export const Kanban = () => {
  const dragDropStore = dragDropComponentUtils.createMultipleListsStore({
    defaultElements: {
      list1: [
        { id: '1', element: () => <div>1</div> },
        { id: '2', element: () => <div>2</div> },
        { id: '3', element: () => <div>3</div> },
        { id: '4', element: () => <div>4</div> },
        { id: '5', element: () => <div>5</div> },
        { id: '6', element: () => <div>6</div> },
      ],
      list2: [],
      list3: [],
    },
  });

  onMount(() => {
    const monitorCleanup = monitorForElements({
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0];

        if (!destination) {
          loggerUtils.warn('no destination target found for drag and drop');

          return;
        }

        const {
          destinationElement,
          destinationDroppableId,
          destinationIndex,
          sourceElement,
          sourceDraggableId,
          sourceDroppableId,
          sourceIndex,
        } = dragDropComponentUtils.parseDestinationAndSourceMultipleList(destination, source, dragDropStore.elements());

        const destinationIsDraggable = dragDropComponentUtils.isDraggable(destinationElement);
        const isDroppingOnDraggable = dragDropComponentUtils.isDroppingOnDraggable(sourceElement, destinationElement);
        const destinationAndSourceAreTheSame = destinationDroppableId === sourceDroppableId;

        if (!sourceDraggableId) {
          loggerUtils.warn('source draggable id not found');

          return;
        }

        batch(() => {
          // since we are in the same list and dropping on a draggable, we need to swap the items
          if (destinationAndSourceAreTheSame && isDroppingOnDraggable) {
            dragDropStore.shiftItem(destinationDroppableId, sourceIndex, destinationIndex);

            return;
          }

          const sourceElements = dragDropStore.elements()[sourceDroppableId];

          dragDropStore.moveItem(sourceDroppableId, sourceElements[sourceIndex], destinationDroppableId);

          // this make sure that when drag and item from one list to another, this item is move to the location it
          // was dragged on
          if (destinationIsDraggable) {
            const destinationElements = dragDropStore.elements()[destinationDroppableId];

            dragDropStore.shiftItem(destinationDroppableId, destinationElements.length - 1, destinationIndex);
          }
        });
      },
    });

    onCleanup(() => {
      monitorCleanup();
    });
  });

  return (
    <div class={styles.listsContainer}>
      <DragDrop.Droppable id="list1" class={styles.list}>
        <For each={dragDropStore.elements().list1}>
          {(element) => (
            <DragDrop.Draggable class={styles.listItem} draggableId={element.id} droppableId="list1" isDroppable>
              {element.element()}
            </DragDrop.Draggable>
          )}
        </For>
      </DragDrop.Droppable>
      <DragDrop.Droppable id="list2" class={styles.list}>
        <For each={dragDropStore.elements().list2}>
          {(element) => (
            <DragDrop.Draggable class={styles.listItem} draggableId={element.id} droppableId="list2" isDroppable>
              {element.element()}
            </DragDrop.Draggable>
          )}
        </For>
      </DragDrop.Droppable>
      <DragDrop.Droppable id="list3" class={styles.list}>
        <For each={dragDropStore.elements().list3}>
          {(element) => (
            <DragDrop.Draggable class={styles.listItem} draggableId={element.id} droppableId="list3" isDroppable>
              {element.element()}
            </DragDrop.Draggable>
          )}
        </For>
      </DragDrop.Droppable>
    </div>
  );
};

export const SwapItems = () => {
  const dragDropStore = dragDropComponentUtils.createSingleListStore({
    defaultElements: [
      { id: '1', element: () => <div>1</div> },
      { id: '2', element: () => <div>2</div> },
      { id: '3', element: () => <div>3</div> },
      { id: '4', element: () => <div>4</div> },
      { id: '5', element: () => <div>5</div> },
      { id: '6', element: () => <div>6</div> },
    ],
  });

  onMount(() => {
    const monitorCleanup = monitorForElements({
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0];

        if (!destination) {
          loggerUtils.warn('no destination target found for drag and drop');

          return;
        }

        const {
          destinationElement,
          destinationDroppableId,
          destinationIndex,
          sourceElement,
          sourceDraggableId,
          sourceDroppableId,
          sourceIndex,
        } = dragDropComponentUtils.parseDestinationAndSourceSingleList(destination, source, dragDropStore.elements());

        const isDroppingOnDraggable = dragDropComponentUtils.isDroppingOnDraggable(sourceElement, destinationElement);
        const destinationAndSourceAreTheSame = destinationDroppableId === sourceDroppableId;

        if (!sourceDraggableId) {
          loggerUtils.warn('source draggable id not found');

          return;
        }

        // since we are in the same list and dropping on a draggable, we need to swap the items
        if (destinationAndSourceAreTheSame === false || isDroppingOnDraggable === false) {
          return;
        }

        dragDropStore.swapItems(sourceIndex, destinationIndex);
      },
    });

    onCleanup(() => {
      monitorCleanup();
    });
  });

  return (
    <div class={styles.listsContainer}>
      <DragDrop.Droppable id="1" class={styles.list}>
        <For each={dragDropStore.elements()}>
          {(element) => (
            <DragDrop.Draggable class={styles.listItem} draggableId={element.id} droppableId="1" isDroppable>
              {element.element()}
            </DragDrop.Draggable>
          )}
        </For>
      </DragDrop.Droppable>
    </div>
  );
};

export const ShiftItems = () => {
  const dragDropStore = dragDropComponentUtils.createSingleListStore({
    defaultElements: [
      { id: '1', element: () => <div>1</div> },
      { id: '2', element: () => <div>2</div> },
      { id: '3', element: () => <div>3</div> },
      { id: '4', element: () => <div>4</div> },
      { id: '5', element: () => <div>5</div> },
      { id: '6', element: () => <div>6</div> },
    ],
  });

  onMount(() => {
    const monitorCleanup = monitorForElements({
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0];

        if (!destination) {
          loggerUtils.warn('no destination target found for drag and drop');

          return;
        }

        const {
          destinationElement,
          destinationDroppableId,
          destinationIndex,
          sourceElement,
          sourceDraggableId,
          sourceDroppableId,
          sourceIndex,
        } = dragDropComponentUtils.parseDestinationAndSourceSingleList(destination, source, dragDropStore.elements());

        const isDroppingOnDraggable = dragDropComponentUtils.isDroppingOnDraggable(sourceElement, destinationElement);
        const destinationAndSourceAreTheSame = destinationDroppableId === sourceDroppableId;

        if (!sourceDraggableId) {
          loggerUtils.warn('source draggable id not found');

          return;
        }

        // since we are in the same list and dropping on a draggable, we need to swap the items
        if (destinationAndSourceAreTheSame === false || isDroppingOnDraggable === false) {
          return;
        }

        dragDropStore.shiftItem(sourceIndex, destinationIndex);
      },
    });

    onCleanup(() => {
      monitorCleanup();
    });
  });

  return (
    <div class={styles.listsContainer}>
      <DragDrop.Droppable id="1" class={styles.list}>
        <For each={dragDropStore.elements()}>
          {(element) => (
            <DragDrop.Draggable class={styles.listItem} draggableId={element.id} droppableId="1" isDroppable>
              {element.element()}
            </DragDrop.Draggable>
          )}
        </For>
      </DragDrop.Droppable>
    </div>
  );
};

export const DraggableHandle = () => {
  const dragDropStore = dragDropComponentUtils.createSingleListStore({
    defaultElements: [
      { id: '1', element: () => <div>1</div> },
      { id: '2', element: () => <div>2</div> },
      { id: '3', element: () => <div>3</div> },
      { id: '4', element: () => <div>4</div> },
      { id: '5', element: () => <div>5</div> },
      { id: '6', element: () => <div>6</div> },
    ],
  });

  onMount(() => {
    const monitorCleanup = monitorForElements({
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0];

        if (!destination) {
          loggerUtils.warn('no destination target found for drag and drop');

          return;
        }

        const {
          destinationElement,
          destinationDroppableId,
          destinationIndex,
          sourceElement,
          sourceDraggableId,
          sourceDroppableId,
          sourceIndex,
        } = dragDropComponentUtils.parseDestinationAndSourceSingleList(destination, source, dragDropStore.elements());

        const isDroppingOnDraggable = dragDropComponentUtils.isDroppingOnDraggable(sourceElement, destinationElement);
        const destinationAndSourceAreTheSame = destinationDroppableId === sourceDroppableId;

        if (!sourceDraggableId) {
          loggerUtils.warn('source draggable id not found');

          return;
        }

        // since we are in the same list and dropping on a draggable, we need to swap the items
        if (destinationAndSourceAreTheSame === false || isDroppingOnDraggable === false) {
          return;
        }

        dragDropStore.shiftItem(sourceIndex, destinationIndex);
      },
    });

    onCleanup(() => {
      monitorCleanup();
    });
  });

  return (
    <div class={styles.listsContainer}>
      <DragDrop.Droppable id="1" class={styles.list}>
        <For each={dragDropStore.elements()}>
          {(element) => (
            <DragDrop.Draggable class={styles.listItem} draggableId={element.id} droppableId="1" isDroppable>
              <Icon
                class={styles.listItemDragHandle}
                data-drag-handle="true"
                icon="dots-six-vertical"
                size={IconSize.BASE}
              />
              {element.element()}
            </DragDrop.Draggable>
          )}
        </For>
      </DragDrop.Droppable>
    </div>
  );
};
