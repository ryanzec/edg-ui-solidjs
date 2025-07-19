import {
  default as BaseScrollArea,
  ScrollAreaContext,
  type ScrollAreaContextData,
} from '$/core/components/scroll-area/scroll-area';
import {
  default as ScrollAreaVirtual,
  type ScrollAreaVirtualProps,
} from '$/core/components/scroll-area/scroll-area-virtual';

export type { ScrollAreaVirtualProps, ScrollAreaContextData };

export { ScrollAreaContext };

export const ScrollArea = Object.assign(BaseScrollArea, {
  Virtual: ScrollAreaVirtual,
});

export default ScrollArea;
