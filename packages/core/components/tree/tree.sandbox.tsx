import Button from '$/core/components/button';
import ScrollArea from '$/core/components/scroll-area';
import Tree, { TreeSize } from '$/core/components/tree';
import { treeComponentUtils } from '$/core/components/tree';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';
import { For, createSignal } from 'solid-js';

export default {
  title: 'Components/Tree',
};

type Item = {
  id: string;
  test: string;
};

const groupItem: Item = {
  id: 'group',
  test: 'group',
};

const item: Item = {
  id: 'item',
  test: 'item',
};

const handleSelectGroup = (isExpanded: boolean, item?: Item) => {
  console.log('group', isExpanded, item);
};

const handleSelectItem = (item: Item) => {
  console.log('item', item);
};

export const Basic = () => {
  const treeStore = treeComponentUtils.createStore();

  return (
    <SandboxExamplesContainer>
      <Tree treeStore={treeStore}>
        <Tree.Group label="Documents" item={groupItem} onSelectGroup={handleSelectGroup}>
          <Tree.Group label="Work" item={groupItem} onSelectGroup={handleSelectGroup}>
            <Tree.Item label="report.pdf" item={item} onSelectItem={handleSelectItem} />
            <Tree.Item label="presentation.pptx" item={item} onSelectItem={handleSelectItem} />
            <Tree.Item label="data.xlsx" item={item} onSelectItem={handleSelectItem} />
          </Tree.Group>
          <Tree.Group label="Personal" item={groupItem} onSelectGroup={handleSelectGroup}>
            <Tree.Group label="photos" item={groupItem} onSelectGroup={handleSelectGroup}>
              <Tree.Item label="vacation.jpg" item={item} onSelectItem={handleSelectItem} />
              <Tree.Item label="family.jpg" item={item} onSelectItem={handleSelectItem} />
            </Tree.Group>
            <Tree.Item label="notes.txt" item={item} onSelectItem={handleSelectItem} />
          </Tree.Group>
        </Tree.Group>
        <Tree.Group label="Downloads" item={groupItem} onSelectGroup={handleSelectGroup}>
          <Tree.Group label="software" item={groupItem} onSelectGroup={handleSelectGroup}>
            <Tree.Item label="app.dmg" item={item} onSelectItem={handleSelectItem} />
            <Tree.Item label="update.zip" item={item} onSelectItem={handleSelectItem} />
          </Tree.Group>
        </Tree.Group>
        <Tree.Group label="Desktop" item={groupItem} onSelectGroup={handleSelectGroup}>
          <Tree.Item label="shortcut.lnk" item={item} onSelectItem={handleSelectItem} />
        </Tree.Group>
      </Tree>
    </SandboxExamplesContainer>
  );
};

export const CustomIcons = () => {
  const treeStore = treeComponentUtils.createStore();

  return (
    <SandboxExamplesContainer>
      <Tree treeStore={treeStore}>
        <Tree.Group label="Documents" item={groupItem} onSelectGroup={handleSelectGroup}>
          <Tree.Group label="Work" item={groupItem} onSelectGroup={handleSelectGroup}>
            <Tree.Item label="report.pdf" item={item} onSelectItem={handleSelectItem} icon="x" />
            <Tree.Item label="presentation.pptx" item={item} onSelectItem={handleSelectItem} icon="arrow-down" />
            <Tree.Item label="data.xlsx" item={item} onSelectItem={handleSelectItem} icon="arrow-left" />
          </Tree.Group>
          <Tree.Group label="Personal" item={groupItem} onSelectGroup={handleSelectGroup}>
            <Tree.Group label="photos" item={groupItem} onSelectGroup={handleSelectGroup}>
              <Tree.Item label="vacation.jpg" item={item} onSelectItem={handleSelectItem} icon="arrow-square-out" />
              <Tree.Item label="family.jpg" item={item} onSelectItem={handleSelectItem} icon="check-square" />
            </Tree.Group>
            <Tree.Item label="notes.txt" item={item} onSelectItem={handleSelectItem} icon="text-align-justify" />
          </Tree.Group>
        </Tree.Group>
        <Tree.Group label="Downloads" item={groupItem} onSelectGroup={handleSelectGroup}>
          <Tree.Group label="software" item={groupItem} onSelectGroup={handleSelectGroup}>
            <Tree.Item label="app.dmg" item={item} onSelectItem={handleSelectItem} icon="lightning" />
            <Tree.Item label="update.zip" item={item} onSelectItem={handleSelectItem} icon="plus" />
          </Tree.Group>
        </Tree.Group>
        <Tree.Group label="Desktop" item={groupItem} onSelectGroup={handleSelectGroup}>
          <Tree.Item label="shortcut.lnk" item={item} onSelectItem={handleSelectItem} icon="funnel" />
        </Tree.Group>
      </Tree>
    </SandboxExamplesContainer>
  );
};

export const Sizes = () => {
  const treeStore = treeComponentUtils.createStore();
  const smallTreeStore = treeComponentUtils.createStore({ initialSize: TreeSize.SMALL });

  return (
    <>
      <SandboxExamplesContainer>
        <div>Default</div>
        <Tree treeStore={treeStore}>
          <Tree.Group label="Documents" item={groupItem} onSelectGroup={handleSelectGroup}>
            <Tree.Group label="Work" item={groupItem} onSelectGroup={handleSelectGroup}>
              <Tree.Item label="report.pdf" item={item} onSelectItem={handleSelectItem} />
              <Tree.Item label="presentation.pptx" item={item} onSelectItem={handleSelectItem} />
              <Tree.Item label="data.xlsx" item={item} onSelectItem={handleSelectItem} />
            </Tree.Group>
            <Tree.Group label="Personal" item={groupItem} onSelectGroup={handleSelectGroup}>
              <Tree.Group label="photos" item={groupItem} onSelectGroup={handleSelectGroup}>
                <Tree.Item label="vacation.jpg" item={item} onSelectItem={handleSelectItem} />
                <Tree.Item label="family.jpg" item={item} onSelectItem={handleSelectItem} />
              </Tree.Group>
              <Tree.Item label="notes.txt" item={item} onSelectItem={handleSelectItem} />
            </Tree.Group>
          </Tree.Group>
          <Tree.Group label="Downloads" item={groupItem} onSelectGroup={handleSelectGroup}>
            <Tree.Group label="software" item={groupItem} onSelectGroup={handleSelectGroup}>
              <Tree.Item label="app.dmg" item={item} onSelectItem={handleSelectItem} />
              <Tree.Item label="update.zip" item={item} onSelectItem={handleSelectItem} />
            </Tree.Group>
          </Tree.Group>
          <Tree.Group label="Desktop" item={groupItem} onSelectGroup={handleSelectGroup}>
            <Tree.Item label="shortcut.lnk" item={item} onSelectItem={handleSelectItem} />
          </Tree.Group>
        </Tree>
        <div>Small</div>
        <Tree treeStore={smallTreeStore}>
          <Tree.Group label="Documents" item={groupItem} onSelectGroup={handleSelectGroup}>
            <Tree.Group label="Work" item={groupItem} onSelectGroup={handleSelectGroup}>
              <Tree.Item label="report.pdf" item={item} onSelectItem={handleSelectItem} />
              <Tree.Item label="presentation.pptx" item={item} onSelectItem={handleSelectItem} />
              <Tree.Item label="data.xlsx" item={item} onSelectItem={handleSelectItem} />
            </Tree.Group>
            <Tree.Group label="Personal" item={groupItem} onSelectGroup={handleSelectGroup}>
              <Tree.Group label="photos" item={groupItem} onSelectGroup={handleSelectGroup}>
                <Tree.Item label="vacation.jpg" item={item} onSelectItem={handleSelectItem} />
                <Tree.Item label="family.jpg" item={item} onSelectItem={handleSelectItem} />
              </Tree.Group>
              <Tree.Item label="notes.txt" item={item} onSelectItem={handleSelectItem} />
            </Tree.Group>
          </Tree.Group>
          <Tree.Group label="Downloads" item={groupItem} onSelectGroup={handleSelectGroup}>
            <Tree.Group label="software" item={groupItem} onSelectGroup={handleSelectGroup}>
              <Tree.Item label="app.dmg" item={item} onSelectItem={handleSelectItem} />
              <Tree.Item label="update.zip" item={item} onSelectItem={handleSelectItem} />
            </Tree.Group>
          </Tree.Group>
          <Tree.Group label="Desktop" item={groupItem} onSelectGroup={handleSelectGroup}>
            <Tree.Item label="shortcut.lnk" item={item} onSelectItem={handleSelectItem} />
          </Tree.Group>
        </Tree>
      </SandboxExamplesContainer>
    </>
  );
};

export const DeepNesting = () => {
  const treeStore = treeComponentUtils.createStore();

  return (
    <SandboxExamplesContainer>
      <Tree treeStore={treeStore}>
        <Tree.Group label="Documents" item={groupItem} onSelectGroup={handleSelectGroup}>
          <Tree.Group label="Work" item={groupItem} onSelectGroup={handleSelectGroup}>
            <Tree.Group label="More Work" item={groupItem} onSelectGroup={handleSelectGroup}>
              <Tree.Group label="Even MoreWork" item={groupItem} onSelectGroup={handleSelectGroup}>
                <Tree.Group label="Final Work" item={groupItem} onSelectGroup={handleSelectGroup}>
                  <Tree.Group label="True FinalWork" item={groupItem} onSelectGroup={handleSelectGroup}>
                    <Tree.Item label="report.pdf" item={item} onSelectItem={handleSelectItem} />
                    <Tree.Item label="presentation.pptx" item={item} onSelectItem={handleSelectItem} />
                    <Tree.Item label="data.xlsx" item={item} onSelectItem={handleSelectItem} />
                  </Tree.Group>
                </Tree.Group>
              </Tree.Group>
            </Tree.Group>
          </Tree.Group>
          <Tree.Group label="Personal" item={groupItem} onSelectGroup={handleSelectGroup}>
            <Tree.Group label="photos" item={groupItem} onSelectGroup={handleSelectGroup}>
              <Tree.Item label="vacation.jpg" item={item} onSelectItem={handleSelectItem} />
              <Tree.Item label="family.jpg" item={item} onSelectItem={handleSelectItem} />
            </Tree.Group>
            <Tree.Item label="notes.txt" item={item} onSelectItem={handleSelectItem} />
          </Tree.Group>
        </Tree.Group>
        <Tree.Group label="Downloads" item={groupItem} onSelectGroup={handleSelectGroup}>
          <Tree.Group label="software" item={groupItem} onSelectGroup={handleSelectGroup}>
            <Tree.Item label="app.dmg" item={item} onSelectItem={handleSelectItem} />
            <Tree.Item label="update.zip" item={item} onSelectItem={handleSelectItem} />
          </Tree.Group>
        </Tree.Group>
        <Tree.Group label="Desktop" item={groupItem} onSelectGroup={handleSelectGroup}>
          <Tree.Item label="shortcut.lnk" item={item} onSelectItem={handleSelectItem} />
        </Tree.Group>
      </Tree>
    </SandboxExamplesContainer>
  );
};

export const Active = () => {
  const treeStore = treeComponentUtils.createStore();

  return (
    <SandboxExamplesContainer>
      <Tree treeStore={treeStore}>
        <Tree.Group label="Documents" item={groupItem} defaultIsExpanded onSelectGroup={handleSelectGroup}>
          <Tree.Group label="Work" item={groupItem} defaultIsExpanded onSelectGroup={handleSelectGroup}>
            <Tree.Item label="report.pdf" item={item} onSelectItem={handleSelectItem} />
            <Tree.Item label="presentation.pptx" item={item} onSelectItem={handleSelectItem} />
            <Tree.Item label="data.xlsx" item={item} onSelectItem={handleSelectItem} />
          </Tree.Group>
          <Tree.Group label="Personal" item={groupItem} onSelectGroup={handleSelectGroup}>
            <Tree.Group label="photos" item={groupItem} onSelectGroup={handleSelectGroup}>
              <Tree.Item label="vacation.jpg" item={item} onSelectItem={handleSelectItem} />
              <Tree.Item label="family.jpg" item={item} onSelectItem={handleSelectItem} />
            </Tree.Group>
            <Tree.Item label="notes.txt" item={item} onSelectItem={handleSelectItem} />
          </Tree.Group>
        </Tree.Group>
        <Tree.Group label="Downloads" item={groupItem} onSelectGroup={handleSelectGroup}>
          <Tree.Group label="software" item={groupItem} onSelectGroup={handleSelectGroup}>
            <Tree.Item label="app.dmg" item={item} onSelectItem={handleSelectItem} />
            <Tree.Item label="update.zip" item={item} onSelectItem={handleSelectItem} />
          </Tree.Group>
        </Tree.Group>
        <Tree.Group label="Desktop" item={groupItem} onSelectGroup={handleSelectGroup}>
          <Tree.Item label="shortcut.lnk" item={item} onSelectItem={handleSelectItem} />
        </Tree.Group>
      </Tree>
    </SandboxExamplesContainer>
  );
};

export const Scrolling = () => {
  const treeStore = treeComponentUtils.createStore();

  return (
    <SandboxExamplesContainer>
      <div style={{ height: '200px', width: '200px' }}>
        <ScrollArea>
          <Tree treeStore={treeStore}>
            <Tree.Group label="Documents" item={groupItem} onSelectGroup={handleSelectGroup}>
              <Tree.Group
                label="Work that has a very long name in order to test the scrolling functionality"
                item={groupItem}
                onSelectGroup={handleSelectGroup}
              >
                <Tree.Item
                  label="report-that-has-a-very-long-name-in-order-to-test-the-scrolling-functionality.pdf"
                  item={item}
                  onSelectItem={handleSelectItem}
                />
                <Tree.Item label="presentation.pptx" item={item} onSelectItem={handleSelectItem} />
                <Tree.Item label="data.xlsx" item={item} onSelectItem={handleSelectItem} />
                <Tree.Item label="report.pdf" item={item} onSelectItem={handleSelectItem} />
                <Tree.Item label="presentation.pptx" item={item} onSelectItem={handleSelectItem} />
                <Tree.Item label="data.xlsx" item={item} onSelectItem={handleSelectItem} />
                <Tree.Item label="report.pdf" item={item} onSelectItem={handleSelectItem} />
                <Tree.Item label="presentation.pptx" item={item} onSelectItem={handleSelectItem} />
                <Tree.Item label="data.xlsx" item={item} onSelectItem={handleSelectItem} />
                <Tree.Item label="report.pdf" item={item} onSelectItem={handleSelectItem} />
                <Tree.Item label="presentation.pptx" item={item} onSelectItem={handleSelectItem} />
                <Tree.Item label="data.xlsx" item={item} onSelectItem={handleSelectItem} />
                <Tree.Item label="report.pdf" item={item} onSelectItem={handleSelectItem} />
                <Tree.Item label="presentation.pptx" item={item} onSelectItem={handleSelectItem} />
                <Tree.Item label="data.xlsx" item={item} onSelectItem={handleSelectItem} />
                <Tree.Item label="report.pdf" item={item} onSelectItem={handleSelectItem} />
                <Tree.Item label="presentation.pptx" item={item} onSelectItem={handleSelectItem} />
                <Tree.Item label="data.xlsx" item={item} onSelectItem={handleSelectItem} />
                <Tree.Item label="report.pdf" item={item} onSelectItem={handleSelectItem} />
                <Tree.Item label="presentation.pptx" item={item} onSelectItem={handleSelectItem} />
                <Tree.Item label="data.xlsx" item={item} onSelectItem={handleSelectItem} />
                <Tree.Item label="report.pdf" item={item} onSelectItem={handleSelectItem} />
                <Tree.Item label="presentation.pptx" item={item} onSelectItem={handleSelectItem} />
                <Tree.Item label="data.xlsx" item={item} onSelectItem={handleSelectItem} />
                <Tree.Item label="report.pdf" item={item} onSelectItem={handleSelectItem} />
                <Tree.Item label="presentation.pptx" item={item} onSelectItem={handleSelectItem} />
                <Tree.Item label="data.xlsx" item={item} onSelectItem={handleSelectItem} />
              </Tree.Group>
              <Tree.Group label="Personal" item={groupItem} onSelectGroup={handleSelectGroup}>
                <Tree.Group label="photos" item={groupItem} onSelectGroup={handleSelectGroup}>
                  <Tree.Item label="vacation.jpg" item={item} onSelectItem={handleSelectItem} />
                  <Tree.Item label="family.jpg" item={item} onSelectItem={handleSelectItem} />
                </Tree.Group>
                <Tree.Item label="notes.txt" item={item} onSelectItem={handleSelectItem} />
              </Tree.Group>
            </Tree.Group>
            <Tree.Group label="Downloads" item={groupItem} onSelectGroup={handleSelectGroup}>
              <Tree.Group label="software" item={groupItem} onSelectGroup={handleSelectGroup}>
                <Tree.Item label="app.dmg" item={item} onSelectItem={handleSelectItem} />
                <Tree.Item label="update.zip" item={item} onSelectItem={handleSelectItem} />
              </Tree.Group>
            </Tree.Group>
            <Tree.Group label="Desktop" item={groupItem} onSelectGroup={handleSelectGroup}>
              <Tree.Item label="shortcut.lnk" item={item} onSelectItem={handleSelectItem} />
            </Tree.Group>
          </Tree>
        </ScrollArea>
      </div>
    </SandboxExamplesContainer>
  );
};

export const ScrollToItem = () => {
  const startingItemData: Item[] = [];

  for (let i = 0; i < 200; i++) {
    startingItemData.push({
      id: `report${i + 1}.pdf`,
      test: `report${i + 1}.pdf`,
    });
  }

  const [items, setItems] = createSignal<Item[]>(startingItemData);

  const treeStore = treeComponentUtils.createStore();

  const handleScrollToItem = () => {
    treeStore.scrollToItem('report100.pdf');
  };

  return (
    <>
      <Button onClick={handleScrollToItem}>Scroll to Item 100</Button>
      <SandboxExamplesContainer>
        <Tree treeStore={treeStore}>
          <For each={items()}>
            {(item) => (
              <Tree.Item label={item.test} data-value={item.test} item={item} onSelectItem={handleSelectItem} />
            )}
          </For>
        </Tree>
      </SandboxExamplesContainer>
    </>
  );
};

export const UpdatingItems = () => {
  const startingItemData: Item[] = [];

  for (let i = 0; i < 9; i++) {
    startingItemData.push({
      id: `report${i + 1}.pdf`,
      test: `report${i + 1}.pdf`,
    });
  }

  const [items, setItems] = createSignal<Item[]>(startingItemData);

  const treeStore = treeComponentUtils.createStore();

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: `report${prev.length + 1}.pdf`,
        test: `report${prev.length + 1}.pdf`,
      },
    ]);
  };

  const handleRemoveItem = () => {
    setItems((prev) => prev.slice(0, -1));
  };

  const handleUpdateRandomItem = () => {
    setItems((prev) => {
      const randomIndex = Math.floor(Math.random() * prev.length);
      const randomNumber = Math.floor(Math.random() * 100000000);

      return prev.map((item, index) => (index === randomIndex ? { ...item, test: `report${randomNumber}.pdf` } : item));
    });
  };

  return (
    <>
      <Button onClick={handleAddItem}>Add Item</Button>
      <Button onClick={handleRemoveItem}>Remove Item</Button>
      <Button onClick={handleUpdateRandomItem}>Update Random Item</Button>
      <SandboxExamplesContainer>
        <Tree treeStore={treeStore}>
          <For each={items()}>
            {(item) => (
              <Tree.Item onSelectItem={handleSelectItem} data-value={item.test} item={item} label={item.test} />
            )}
          </For>
        </Tree>
      </SandboxExamplesContainer>
    </>
  );
};
