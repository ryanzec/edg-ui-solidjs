import Button from '$/core/components/button/button';
import ScrollArea from '$/core/components/scroll-area';
import { tailwindUtils } from '$/core/utils/tailwind';
import { createEffect, createSignal, on } from 'solid-js';

export default {
  title: 'Components/ScrollArea',
};

export const Default = () => {
  return (
    <div style={{ height: '200px' }}>
      <ScrollArea>
        Testing
        <br />
        Testing
        <br />
        Testing
        <br />
        Testing
        <br />
        Testing
        <br />
        Testing
        <br />
        Testing
        <br />
        Testing
        <br />
        Testing
        <br />
        Testing
        <br />
        Testing
        <br />
        Testing
        <br />
        Testing
        <br />
        Testing
        <br />
        Testing
        <br />
        Testing
        <br />
        Testing
        <br />
        Testing
        <br />
        Testing
        <br />
        Testing
        <br />
        Testing
        <br />
        Testing
        <br />
        Testing
        <br />
        Testing
        <br />
        Testing
        <br />
        Testing
        <br />
        Testing
        <br />
        Testing
        <br />
        Testing
        <br />
      </ScrollArea>
    </div>
  );
};

export const Virtualized = () => {
  const items = Array.from({ length: 50000 }, (_, i) => i);
  const estimateSize = (index: number) => 35;

  return (
    <ScrollArea.Virtual class="h-[400px]" items={items} estimateSize={estimateSize}>
      {(item) => {
        return <div>Item {item}</div>;
      }}
    </ScrollArea.Virtual>
  );
};

export const VirtualizedExpandableElements = () => {
  const items = Array.from({ length: 50000 }, (_, i) => i);
  const estimateSize = (index: number) => 35;

  return (
    <ScrollArea.Virtual class="h-[400px]" items={items} estimateSize={estimateSize}>
      {(index, virtualizer) => {
        // while it might seem like we could create a reusable store for this, the cause for triggering a
        // recalculation for the element might be any number of things so to avoid complexity we'll just have
        // this example that can be used as a reference when needed
        const item = items[index];
        const [isHidden, setIsHidden] = createSignal<boolean>(true);
        const [element, setElement] = createSignal<Element>();

        const handleExpand = () => {
          setIsHidden(!isHidden());
        };

        createEffect(
          on(isHidden, function recalculateItemSize() {
            if (!element()) {
              return;
            }

            virtualizer.measureElement(element());
          }),
        );

        return (
          <div data-index={index} ref={setElement}>
            Item {item} <Button onClick={handleExpand}>{isHidden() ? 'Expand' : 'Collapse'}</Button>
            <div
              class={tailwindUtils.merge({
                hidden: isHidden(),
              })}
            >
              <div>EXTRA CONTENT</div>
            </div>
          </div>
        );
      }}
    </ScrollArea.Virtual>
  );
};
