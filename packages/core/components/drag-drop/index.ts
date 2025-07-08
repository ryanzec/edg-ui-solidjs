import { default as Draggable, type DraggableProps } from '$/core/components/drag-drop/draggable';
import { default as Droppable, type DroppableProps } from '$/core/components/drag-drop/droppable';

export { dragDropComponentUtils, type DragDropElement } from '$/core/components/drag-drop/utils';
export type { DraggableProps, DroppableProps };

export const DragDrop = Object.assign({}, { Draggable, Droppable });

export default DragDrop;
