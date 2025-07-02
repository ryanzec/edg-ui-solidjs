import ScrollArea from '$/core/components/scroll-area';
import Tabs, { TabSize } from '$/core/components/tabs';
import { TabOrientation } from '$/core/components/tabs';
import { TabVariant } from '$/core/components/tabs/tabs';
import styles from '$/core/components/tabs/tabs.sandbox.module.css';
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
        <ScrollArea>
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
    </SandboxExamplesContainer>
  );
};
