import Draggable, { type DraggableProps } from '$/core/components/drag-drop/draggable';
import Droppable, { type DroppableProps } from '$/core/components/drag-drop/droppable';

export { dragDropComponentUtils, type DragDropElement } from '$/core/components/drag-drop/utils';
export type { DraggableProps, DroppableProps };

export default Object.assign({}, { Draggable, Droppable });
