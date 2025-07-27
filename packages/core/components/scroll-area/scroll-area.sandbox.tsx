import { createEffect, createSignal, on } from 'solid-js';
import Button from '$/core/components/button/button';
import ScrollArea from '$/core/components/scroll-area';
import { tailwindUtils } from '$/core/utils/tailwind';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container';

export default {
  title: 'Components/ScrollArea',
};

export const Default = () => {
  return (
    <div style={{ height: '200px' }}>
      <ScrollArea>
        <div>
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
        </div>
      </ScrollArea>
    </div>
  );
};

export const DontOverlapContent = () => {
  return (
    <SandboxExamplesContainer>
      <div class="w-[200px] h-[200px]">
        <ScrollArea overlapContent={false}>
          <div>
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
          </div>
        </ScrollArea>
      </div>
      <div class="w-[200px]">
        <ScrollArea overlapContent={false}>
          <div>
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
          </div>
        </ScrollArea>
      </div>
      <div class="h-[200px]">
        <ScrollArea overlapContent={false}>
          <div>
            t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t
            t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t
            t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t
            t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t
            t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t
            t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t
            t t t t t t t t t t t t t t t t t t t t t t t t
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
            TestingTestingTestingTestingTestingTesting
            <br />
          </div>
        </ScrollArea>
      </div>
    </SandboxExamplesContainer>
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
        const [elementRef, setElementRef] = createSignal<Element>();

        const handleExpand = () => {
          setIsHidden(!isHidden());
        };

        createEffect(
          on(isHidden, function recalculateItemSize() {
            if (!elementRef()) {
              return;
            }

            virtualizer.measureElement(elementRef());
          }),
        );

        return (
          <div data-index={index} ref={setElementRef}>
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
