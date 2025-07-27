import type { JSX } from 'solid-js';
import DragDrop from '$/core/components/drag-drop';
import type { CommonDataAttributes } from '$/core/types/generic';

export type DragDropLayoutSlotProps = JSX.HTMLAttributes<HTMLDivElement> &
  CommonDataAttributes & {
    draggableId: string;
    droppableId: string;
    contentClass?: string;
  };

const DragDropLayoutSlot = (props: DragDropLayoutSlotProps) => {
  return (
    <DragDrop.Draggable
      class={props.class}
      data-swapy-item={props.id}
      draggableId={props.draggableId}
      droppableId={props.droppableId}
      isDroppable
    >
      <div class={props.contentClass}>{props.children}</div>
    </DragDrop.Draggable>
  );
};

export default DragDropLayoutSlot;
