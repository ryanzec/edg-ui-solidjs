import ScrollArea from '$/core/components/scroll-area/scroll-area';
import { type Virtualizer, type VirtualizerOptions, createVirtualizer } from '@tanstack/solid-virtual';
import type { OverlayScrollbars } from 'overlayscrollbars';
import { For, type JSX, createEffect, createSignal, mergeProps, onCleanup } from 'solid-js';

export type ScrollAreaVirtualProps<TData> = {
  class?: string;
  children: (index: number, virtualizer: Virtualizer<HTMLElement, Element>) => JSX.Element;
  items: TData[];
  estimateSize: VirtualizerOptions<HTMLElement, Element>['estimateSize'];
  overscan?: VirtualizerOptions<HTMLElement, Element>['overscan'];
  getItemKey?: VirtualizerOptions<HTMLElement, Element>['getItemKey'];
  hasExtraRow?: boolean;
  virtualizedRef?: (element: HTMLElement | undefined) => void;
};

const ScrollAreaVirtual = <TData,>(passedProps: ScrollAreaVirtualProps<TData>) => {
  const props = mergeProps({ overscan: 5 }, passedProps);

  const [virtualizedElement, setVirtualizedElement] = createSignal<OverlayScrollbars | undefined>();

  // while this is a little unusual, in order for the virtualizer to work with the reactive nature of solid js
  // we need to use a getters for some of the properties which ensure when access internal, it will always be the
  // latest value
  const virtualizer = createVirtualizer({
    get count() {
      return props.items.length + (props.hasExtraRow ? 1 : 0);
    },
    getScrollElement: () => {
      const instance = virtualizedElement();
      return instance?.elements().viewport || null;
    },
    estimateSize: props.estimateSize,
    get overscan() {
      return props.overscan;
    },
    getItemKey: props.getItemKey,
  });

  createEffect(function onVirtualizedComponentUpdate() {
    const viewport = virtualizedElement()?.elements().viewport;

    if (!viewport) {
      return;
    }

    props.virtualizedRef?.(viewport);

    onCleanup(() => {
      props.virtualizedRef?.(undefined);
    });
  });
  return (
    <ScrollArea class={props.class} ref={setVirtualizedElement}>
      <div class="w-full relative" style={`height: ${virtualizer.getTotalSize()}px`}>
        <For each={virtualizer.getVirtualItems()}>
          {(virtualItem) => {
            return (
              <div
                class="absolute top-0 left-0 w-full"
                style={`height: ${virtualItem.size}px; transform: translateY(${virtualItem.start}px)`}
              >
                {props.children(virtualItem.index, virtualizer)}
              </div>
            );
          }}
        </For>
      </div>
    </ScrollArea>
  );
};

export default ScrollAreaVirtual;
