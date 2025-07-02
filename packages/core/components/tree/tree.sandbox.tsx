import ScrollArea from '$/core/components/scroll-area';
import Tree, { TreeSize } from '$/core/components/tree';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';

export default {
  title: 'Components/Tree',
};

type Item = {
  test: string;
};

const groupItem: Item = {
  test: 'group',
};

const item: Item = {
  test: 'item',
};

const handleSelectGroup = (isExpanded: boolean, item?: Item) => {
  console.log('group', isExpanded, item);
};

const handleSelectItem = (item: Item) => {
  console.log('item', item);
};

export const Basic = () => {
  return (
    <SandboxExamplesContainer>
      <Tree>
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
  return (
    <SandboxExamplesContainer>
      <Tree>
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
  return (
    <>
      <SandboxExamplesContainer>
        <div>Default</div>
        <Tree>
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
        <Tree size={TreeSize.SMALL}>
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
  return (
    <SandboxExamplesContainer>
      <Tree>
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
  return (
    <SandboxExamplesContainer>
      <Tree>
        <Tree.Group label="Documents" item={groupItem} defaultIsExpanded onSelectGroup={handleSelectGroup}>
          <Tree.Group label="Work" item={groupItem} defaultIsExpanded onSelectGroup={handleSelectGroup}>
            <Tree.Item label="report.pdf" item={item} onSelectItem={handleSelectItem} isActive />
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
  return (
    <SandboxExamplesContainer>
      <div style={{ height: '200px', width: '200px' }}>
        <ScrollArea>
          <Tree>
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
                  isActive
                />
                <Tree.Item label="presentation.pptx" item={item} onSelectItem={handleSelectItem} />
                <Tree.Item label="data.xlsx" item={item} onSelectItem={handleSelectItem} />
                <Tree.Item label="report.pdf" item={item} onSelectItem={handleSelectItem} isActive />
                <Tree.Item label="presentation.pptx" item={item} onSelectItem={handleSelectItem} />
                <Tree.Item label="data.xlsx" item={item} onSelectItem={handleSelectItem} />
                <Tree.Item label="report.pdf" item={item} onSelectItem={handleSelectItem} isActive />
                <Tree.Item label="presentation.pptx" item={item} onSelectItem={handleSelectItem} />
                <Tree.Item label="data.xlsx" item={item} onSelectItem={handleSelectItem} />
                <Tree.Item label="report.pdf" item={item} onSelectItem={handleSelectItem} isActive />
                <Tree.Item label="presentation.pptx" item={item} onSelectItem={handleSelectItem} />
                <Tree.Item label="data.xlsx" item={item} onSelectItem={handleSelectItem} />
                <Tree.Item label="report.pdf" item={item} onSelectItem={handleSelectItem} isActive />
                <Tree.Item label="presentation.pptx" item={item} onSelectItem={handleSelectItem} />
                <Tree.Item label="data.xlsx" item={item} onSelectItem={handleSelectItem} />
                <Tree.Item label="report.pdf" item={item} onSelectItem={handleSelectItem} isActive />
                <Tree.Item label="presentation.pptx" item={item} onSelectItem={handleSelectItem} />
                <Tree.Item label="data.xlsx" item={item} onSelectItem={handleSelectItem} />
                <Tree.Item label="report.pdf" item={item} onSelectItem={handleSelectItem} isActive />
                <Tree.Item label="presentation.pptx" item={item} onSelectItem={handleSelectItem} />
                <Tree.Item label="data.xlsx" item={item} onSelectItem={handleSelectItem} />
                <Tree.Item label="report.pdf" item={item} onSelectItem={handleSelectItem} isActive />
                <Tree.Item label="presentation.pptx" item={item} onSelectItem={handleSelectItem} />
                <Tree.Item label="data.xlsx" item={item} onSelectItem={handleSelectItem} />
                <Tree.Item label="report.pdf" item={item} onSelectItem={handleSelectItem} isActive />
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
