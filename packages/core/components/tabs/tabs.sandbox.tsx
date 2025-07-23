import ScrollArea from '$/core/components/scroll-area';
import Tabs, { TabSize } from '$/core/components/tabs';
import { TabOrientation } from '$/core/components/tabs';
import { TabVariant } from '$/core/components/tabs/tabs';
import styles from '$/core/components/tabs/tabs.sandbox.module.css';
import Tooltip, { type TooltipComponentRef } from '$/core/components/tooltip';
import { componentRefUtils } from '$/core/stores/component-ref';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';

export default {
  title: 'Components/Tabs',
};

export const Horizontal = () => {
  return (
    <SandboxExamplesContainer>
      <Tabs>
        <Tabs.Tab>Tab 1</Tabs.Tab>
        <Tabs.Tab isActive>Tab 2</Tabs.Tab>
        <Tabs.Tab>Tab 3</Tabs.Tab>
        <Tabs.Tab>Tab 4</Tabs.Tab>
      </Tabs>
      <div class={styles.darkBackground}>
        <Tabs onInverse>
          <Tabs.Tab>Tab 1</Tabs.Tab>
          <Tabs.Tab>Tab 2</Tabs.Tab>
          <Tabs.Tab isActive>Tab 3</Tabs.Tab>
          <Tabs.Tab>Tab 4</Tabs.Tab>
        </Tabs>
      </div>
    </SandboxExamplesContainer>
  );
};

export const Vertical = () => {
  return (
    <SandboxExamplesContainer class="max-w-[500px]">
      <Tabs orientation={TabOrientation.VERTICAL}>
        <Tabs.Tab>Tab 1</Tabs.Tab>
        <Tabs.Tab isActive>Tab 2</Tabs.Tab>
        <Tabs.Tab>Tab 3</Tabs.Tab>
        <Tabs.Tab>Tab 4</Tabs.Tab>
      </Tabs>
      <div class={styles.darkBackground}>
        <Tabs orientation={TabOrientation.VERTICAL} onInverse>
          <Tabs.Tab>Tab 1</Tabs.Tab>
          <Tabs.Tab>Tab 2</Tabs.Tab>
          <Tabs.Tab isActive>Tab 3</Tabs.Tab>
          <Tabs.Tab>Tab 4</Tabs.Tab>
        </Tabs>
      </div>
    </SandboxExamplesContainer>
  );
};

export const Icons = () => {
  return (
    <SandboxExamplesContainer class="max-w-[500px]">
      <Tabs>
        <Tabs.Tab icon="house" isActive>
          Tab 1
        </Tabs.Tab>
        <Tabs.Tab icon="house">Tab 2</Tabs.Tab>
        <Tabs.Tab icon="house">Tab 3</Tabs.Tab>
        <Tabs.Tab icon="house">Tab 4</Tabs.Tab>
      </Tabs>
      <div class={styles.darkBackground}>
        <Tabs orientation={TabOrientation.VERTICAL} onInverse>
          <Tabs.Tab icon="house">Tab 1</Tabs.Tab>
          <Tabs.Tab icon="house" isActive>
            Tab 2
          </Tabs.Tab>
          <Tabs.Tab icon="house">Tab 3</Tabs.Tab>
          <Tabs.Tab icon="house">Tab 4</Tabs.Tab>
        </Tabs>
      </div>
    </SandboxExamplesContainer>
  );
};

export const Size = () => {
  return (
    <SandboxExamplesContainer>
      <Tabs>
        <Tabs.Tab>Tab 1</Tabs.Tab>
        <Tabs.Tab isActive>Tab 2</Tabs.Tab>
        <Tabs.Tab>Tab 3</Tabs.Tab>
        <Tabs.Tab>Tab 4</Tabs.Tab>
      </Tabs>
      <div class={styles.darkBackground}>
        <Tabs onInverse>
          <Tabs.Tab>Tab 1</Tabs.Tab>
          <Tabs.Tab>Tab 2</Tabs.Tab>
          <Tabs.Tab isActive>Tab 3</Tabs.Tab>
          <Tabs.Tab>Tab 4</Tabs.Tab>
        </Tabs>
      </div>
      <div>Small</div>
      <Tabs size={TabSize.SMALL}>
        <Tabs.Tab>Tab 1</Tabs.Tab>
        <Tabs.Tab isActive>Tab 2</Tabs.Tab>
        <Tabs.Tab>Tab 3</Tabs.Tab>
        <Tabs.Tab>Tab 4</Tabs.Tab>
      </Tabs>
      <div class={styles.darkBackground}>
        <Tabs size={TabSize.SMALL} onInverse>
          <Tabs.Tab>Tab 1</Tabs.Tab>
          <Tabs.Tab>Tab 2</Tabs.Tab>
          <Tabs.Tab isActive>Tab 3</Tabs.Tab>
          <Tabs.Tab>Tab 4</Tabs.Tab>
        </Tabs>
      </div>
    </SandboxExamplesContainer>
  );
};

export const Files = () => {
  const handleOnClose = (value?: string) => {
    console.log('onClose', value);
  };

  return (
    <SandboxExamplesContainer>
      <Tabs variant={TabVariant.FILES}>
        <Tabs.Tab data-value="1" onClose={handleOnClose} hasUnsavedChanges>
          Tab 1
        </Tabs.Tab>
        <Tabs.Tab data-value="2" onClose={handleOnClose} isActive>
          Tab 2
        </Tabs.Tab>
        <Tabs.Tab data-value="3" onClose={handleOnClose}>
          Tab 3
        </Tabs.Tab>
        <Tabs.Tab data-value="4" onClose={handleOnClose}>
          Tab 4
        </Tabs.Tab>
      </Tabs>
      <div class={styles.darkBackground}>
        <Tabs variant={TabVariant.FILES} onInverse>
          <Tabs.Tab data-value="1" onClose={handleOnClose}>
            Tab 1
          </Tabs.Tab>
          <Tabs.Tab data-value="2" onClose={handleOnClose} hasUnsavedChanges>
            Tab 2
          </Tabs.Tab>
          <Tabs.Tab data-value="3" onClose={handleOnClose} isActive>
            Tab 3
          </Tabs.Tab>
          <Tabs.Tab data-value="4" onClose={handleOnClose}>
            Tab 4
          </Tabs.Tab>
        </Tabs>
      </div>
      <div>Small</div>
      <Tabs size={TabSize.SMALL} variant={TabVariant.FILES}>
        <Tabs.Tab data-value="1" onClose={handleOnClose}>
          Tab 1
        </Tabs.Tab>
        <Tabs.Tab data-value="2" onClose={handleOnClose} isActive>
          Tab 2
        </Tabs.Tab>
        <Tabs.Tab data-value="3" onClose={handleOnClose} hasUnsavedChanges>
          Tab 3
        </Tabs.Tab>
        <Tabs.Tab data-value="4" onClose={handleOnClose}>
          Tab 4
        </Tabs.Tab>
      </Tabs>
      <div class={styles.darkBackground}>
        <Tabs size={TabSize.SMALL} variant={TabVariant.FILES} onInverse>
          <Tabs.Tab data-value="1" onClose={handleOnClose}>
            Tab 1
          </Tabs.Tab>
          <Tabs.Tab data-value="2" onClose={handleOnClose}>
            Tab 2
          </Tabs.Tab>
          <Tabs.Tab data-value="3" onClose={handleOnClose} isActive>
            Tab 3
          </Tabs.Tab>
          <Tabs.Tab data-value="4" onClose={handleOnClose} hasUnsavedChanges>
            Tab 4
          </Tabs.Tab>
        </Tabs>
      </div>
    </SandboxExamplesContainer>
  );
};

export const FilesScrolling = () => {
  const handleOnClose = (value?: string) => {
    console.log('onClose', value);
  };

  return (
    <SandboxExamplesContainer>
      <div class="w-[400px]">
        <ScrollArea overlapContent={false}>
          <Tabs variant={TabVariant.FILES}>
            <Tabs.Tab data-value="1" onClose={handleOnClose} hasUnsavedChanges>
              Tab 1
            </Tabs.Tab>
            <Tabs.Tab data-value="2" onClose={handleOnClose} isActive>
              Tab 2
            </Tabs.Tab>
            <Tabs.Tab data-value="3" onClose={handleOnClose}>
              Tab 3
            </Tabs.Tab>
            <Tabs.Tab data-value="4" onClose={handleOnClose}>
              Tab 4
            </Tabs.Tab>
            <Tabs.Tab data-value="4" onClose={handleOnClose}>
              Tab 4
            </Tabs.Tab>
            <Tabs.Tab data-value="4" onClose={handleOnClose}>
              Tab 4
            </Tabs.Tab>
            <Tabs.Tab data-value="4" onClose={handleOnClose}>
              Tab 4
            </Tabs.Tab>
            <Tabs.Tab data-value="4" onClose={handleOnClose}>
              Tab 4
            </Tabs.Tab>
            <Tabs.Tab data-value="4" onClose={handleOnClose}>
              Tab 4
            </Tabs.Tab>
            <Tabs.Tab data-value="4" onClose={handleOnClose}>
              Tab 4
            </Tabs.Tab>
            <Tabs.Tab data-value="4" onClose={handleOnClose}>
              Tab 4
            </Tabs.Tab>
            <Tabs.Tab data-value="4" onClose={handleOnClose}>
              Tab 4
            </Tabs.Tab>
            <Tabs.Tab data-value="4" onClose={handleOnClose}>
              Tab 4
            </Tabs.Tab>
          </Tabs>
        </ScrollArea>
      </div>
      <div class="w-[400px]">
        <ScrollArea overlapContent={false}>
          <Tabs variant={TabVariant.FILES}>
            <Tabs.Tab data-value="1" onClose={handleOnClose} hasUnsavedChanges>
              Tab 1
            </Tabs.Tab>
            <Tabs.Tab data-value="2" onClose={handleOnClose} isActive>
              Tab 2
            </Tabs.Tab>
            <Tabs.Tab data-value="3" onClose={handleOnClose}>
              Tab 3
            </Tabs.Tab>
            <Tabs.Tab data-value="4" onClose={handleOnClose}>
              Tab 4
            </Tabs.Tab>
          </Tabs>
        </ScrollArea>
      </div>
    </SandboxExamplesContainer>
  );
};

export const Disabled = () => {
  const tooltipComponentRef = componentRefUtils.createRef<TooltipComponentRef>();

  const handleOnClose = (value?: string) => {
    console.log('onClose', value);
  };

  return (
    <SandboxExamplesContainer>
      <Tabs variant={TabVariant.FILES}>
        <Tabs.Tab data-value="1" onClose={handleOnClose} hasUnsavedChanges>
          Tab 1
        </Tabs.Tab>
        <Tabs.Tab data-value="2" onClose={handleOnClose} isActive disabled>
          Tab 2
        </Tabs.Tab>
        <Tabs.Tab data-value="3" onClose={handleOnClose} disabled>
          Tab 3
        </Tabs.Tab>
        <Tooltip triggerEvent="hover" tooltipComponentRef={tooltipComponentRef} placement="bottom">
          <Tooltip.Handle data-id="handle">
            <Tabs.Tab data-value="4" onClose={handleOnClose} disabled>
              Tab 4
            </Tabs.Tab>
          </Tooltip.Handle>
          <Tooltip.Content data-id="content">This tab is disabled</Tooltip.Content>
        </Tooltip>
      </Tabs>
      <div class={styles.darkBackground}>
        <Tabs variant={TabVariant.FILES} onInverse orientation={TabOrientation.VERTICAL}>
          <Tabs.Tab data-value="1" onClose={handleOnClose}>
            Tab 1
          </Tabs.Tab>
          <Tabs.Tab data-value="2" onClose={handleOnClose} hasUnsavedChanges disabled>
            Tab 2
          </Tabs.Tab>
          <Tabs.Tab data-value="3" onClose={handleOnClose} isActive disabled>
            Tab 3
          </Tabs.Tab>
          <Tooltip triggerEvent="hover" tooltipComponentRef={tooltipComponentRef} placement="bottom">
            <Tooltip.Handle data-id="handle">
              <Tabs.Tab data-value="4" onClose={handleOnClose} disabled>
                Tab 4
              </Tabs.Tab>
            </Tooltip.Handle>
            <Tooltip.Content data-id="content">This tab is disabled</Tooltip.Content>
          </Tooltip>
        </Tabs>
      </div>
    </SandboxExamplesContainer>
  );
};
