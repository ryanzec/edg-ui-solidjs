import {
  default as BaseDragDropLayout,
  type DragDropLayoutProps,
} from '$/core/components/drag-drop-layout/drag-drop-layout';
import Slot, { type DragDropLayoutSlotProps } from '$/core/components/drag-drop-layout/drag-drop-layout-slot';

export type { DragDropLayoutProps, DragDropLayoutSlotProps };

export const DragDropLayout = Object.assign(BaseDragDropLayout, { Slot });

export default DragDropLayout;
