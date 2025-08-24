import {
  default as BaseScrollArea,
  ScrollAreaContext,
  type ScrollAreaContextData,
  type ScrollAreaProps,
} from '$/core/components/scroll-area/scroll-area';
import {
  default as ScrollAreaVirtual,
  type ScrollAreaVirtualProps,
} from '$/core/components/scroll-area/scroll-area-virtual';

export type { ScrollAreaVirtualProps, ScrollAreaContextData, ScrollAreaProps };

export { ScrollAreaContext };

export const ScrollArea = Object.assign(BaseScrollArea, {
  Virtual: ScrollAreaVirtual,
});

export default ScrollArea;
