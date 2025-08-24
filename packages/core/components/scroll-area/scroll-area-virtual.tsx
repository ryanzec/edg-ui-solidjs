import { createVirtualizer, type Virtualizer, type VirtualizerOptions } from '@tanstack/solid-virtual';
import { createEffect, createSignal, For, type JSX, mergeProps, onCleanup, Show } from 'solid-js';
import ScrollArea from '$/core/components/scroll-area/scroll-area';
import { tailwindUtils } from '$/core/utils/tailwind';

export type ScrollAreaVirtualProps<TData> = {
  class?: string;
  children: (index: number, virtualizer: Virtualizer<HTMLElement, Element>) => JSX.Element;
  items: TData[];
  estimateSize: VirtualizerOptions<HTMLElement, Element>['estimateSize'];
  overscan?: VirtualizerOptions<HTMLElement, Element>['overscan'];
  getItemKey?: VirtualizerOptions<HTMLElement, Element>['getItemKey'];
  hasExtraRow?: boolean;
  virtualizedElementRef?: (element: HTMLElement | undefined) => void;
};

const ScrollAreaVirtual = <TData,>(passedProps: ScrollAreaVirtualProps<TData>) => {
  const props = mergeProps({ overscan: 5 }, passedProps);

  const [virtualizedElement, setVirtualizedElement] = createSignal<HTMLElement | undefined>();
  const [virtualizer, setVirtualizer] = createSignal<Virtualizer<HTMLElement, Element> | undefined>();

  createEffect(function setupVirtualizer() {
    const currentVirtualizedElement = virtualizedElement();

    if (!currentVirtualizedElement) {
      return;
    }

    props.virtualizedElementRef?.(currentVirtualizedElement);

    // while this is a little unusual, in order for the virtualizer to work with the reactive nature of solid js
    // we need to use a getters for some of the properties which ensure when access internal, it will always be the
    // latest value
    setVirtualizer(
      createVirtualizer({
        get count() {
          return props.items.length + (props.hasExtraRow ? 1 : 0);
        },
        getScrollElement: () => {
          return virtualizedElement() || null;
        },
        estimateSize: props.estimateSize,
        get overscan() {
          return props.overscan;
        },
        getItemKey: props.getItemKey,
      }),
    );

    onCleanup(() => {
      props.virtualizedElementRef?.(undefined);
    });
  });

  createEffect(function updateItems() {
    const currentVirtualizer = virtualizer();

    if (!currentVirtualizer) {
      return;
    }

    // This will trigger when props.items changes
    props.items.length;

    // Only measure if we have a scroll element
    if (virtualizedElement()) {
      currentVirtualizer.measure();
    }
  });

  return (
    <ScrollArea id="test" class={tailwindUtils.merge('h-[500px]', props.class)} ref={setVirtualizedElement}>
      <Show when={virtualizer()}>
        {(virtualizer) => (
          <div class="w-full relative" style={`height: ${virtualizer().getTotalSize()}px`}>
            <For each={virtualizer().getVirtualItems()}>
              {(virtualItem) => {
                return (
                  <div
                    class="absolute top-0 left-0 w-full"
                    style={`height: ${virtualItem.size}px; transform: translateY(${virtualItem.start}px)`}
                  >
                    {props.children(virtualItem.index, virtualizer())}
                  </div>
                );
              }}
            </For>
          </div>
        )}
      </Show>
    </ScrollArea>
  );
};

export default ScrollAreaVirtual;
