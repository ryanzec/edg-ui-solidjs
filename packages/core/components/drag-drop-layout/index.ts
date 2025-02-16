import DragDropLayout, { type DragDropLayoutProps } from '$/core/components/drag-drop-layout/drag-drop-layout';
import Slot, { type DragDropLayoutSlotProps } from '$/core/components/drag-drop-layout/drag-drop-layout-slot';

export type { DragDropLayoutProps, DragDropLayoutSlotProps };

export default Object.assign(DragDropLayout, { Slot });
