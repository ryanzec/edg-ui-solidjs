import DragDrop, { dragDropComponentUtils } from '$/core/components/drag-drop';
import type { DragDropSingleListStore } from '$/core/components/drag-drop/utils';
import type { CommonDataAttributes } from '$/core/types/generic';
import { loggerUtils } from '$/core/utils/logger';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { type JSX, onCleanup, onMount } from 'solid-js';

export type DragDropLayoutProps = JSX.HTMLAttributes<HTMLDivElement> &
  CommonDataAttributes & {
    droppableId: string;
    dragDropSingleListStore: DragDropSingleListStore;
  };

const DragDropLayout = (props: DragDropLayoutProps) => {
  onMount(() => {
    const monitorCleanup = monitorForElements({
      onDrop({ source, location }) {
        // since monitorForElements happens with any drag and drop elements, not just the ones define in the
        // component, and because this is a single list drop and drop elements, we need to only process this if
        // the source is from this list
        if (source.data.droppableId !== props.droppableId) {
          return;
        }

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
        } = dragDropComponentUtils.parseDestinationAndSourceSingleList(
          destination,
          source,
          props.dragDropSingleListStore.elements(),
        );

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

        props.dragDropSingleListStore.swapItems(sourceIndex, destinationIndex);
      },
    });

    onCleanup(() => {
      monitorCleanup();
    });
  });

  return (
    <DragDrop.Droppable class={props.class} id={props.droppableId}>
      {props.children}
    </DragDrop.Droppable>
  );
};

export default DragDropLayout;
