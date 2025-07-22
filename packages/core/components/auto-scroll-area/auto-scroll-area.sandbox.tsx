import Page from '$/application/components/page';
import AutoScrollArea, { type AutoScrollAreaComponentRef, AutoScrollState } from '$/core/components/auto-scroll-area';
import Button from '$/core/components/button';
import GridTable from '$/core/components/grid-table';
import ScrollArea from '$/core/components/scroll-area';
import { componentRefUtils } from '$/core/stores/component-ref';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container';
import { createSignal } from 'solid-js';

export default {
  title: 'Components/AutoScrollArea',
};

type GridData = {
  id: number;
  name: string;
  status: string;
  date: string;
  extraContent?: {
    email: string;
    phone: string;
    department: string;
    lastLogin: string;
  };
};

const gridData: GridData[] = [
  {
    id: 1,
    name: 'John Doe',
    status: 'Active',
    date: '2024-01-15',
  },
  {
    id: 2,
    name: 'Jane Smith',
    status: 'Pending',
    date: '2024-01-20',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    status: 'Inactive',
    date: '2024-01-10',
    extraContent: {
      email: 'bob.johnson@example.com',
      phone: '(555) 123-4567',
      department: 'Engineering',
      lastLogin: '2024-01-08',
    },
  },
  {
    id: 4,
    name: 'Alice Wilson',
    status: 'Active',
    date: '2024-01-25',
  },
  {
    id: 5,
    name: 'Christopher Anderson with a very long name to test dynamic width',
    status: 'Active',
    date: '2024-01-30',
  },
];

export const Default = () => {
  const autoScrollAreaComponentRef = componentRefUtils.createRef<AutoScrollAreaComponentRef>();

  const [data, setData] = createSignal<GridData[]>(gridData);
  let addingTimeoutId: ReturnType<typeof setTimeout>;

  const addData = () => {
    setData((prevData) => [...prevData, ...gridData]);

    addingTimeoutId = setTimeout(() => {
      addData();
    }, 2000);
  };

  const handleStopAdding = () => {
    clearTimeout(addingTimeoutId);
  };

  const handleStartAdding = () => {
    addData();
  };

  return (
    <AutoScrollArea autoScrollAreaComponentRef={autoScrollAreaComponentRef}>
      <Button onClick={handleStartAdding}>Start Adding</Button>
      <Button onClick={handleStopAdding}>Stop Adding</Button>
      <Button onClick={() => autoScrollAreaComponentRef.api()?.setAutoScrollState(AutoScrollState.ENABLED)}>
        Enable Auto Scroll
      </Button>
      <Button onClick={() => autoScrollAreaComponentRef.api()?.setAutoScrollState(AutoScrollState.DISABLED)}>
        Disable Auto Scroll
      </Button>
      <Button onClick={() => autoScrollAreaComponentRef.api()?.setAutoScrollState(AutoScrollState.FORCE_DISABLED)}>
        Force Disabled Auto Scroll
      </Button>
      <Button onClick={() => autoScrollAreaComponentRef.api()?.scrollToBottom()}>Scroll To Bottom</Button>
      <SandboxExamplesContainer>
        <Page.ContentSection>
          <GridTable.Simple
            class="grid-cols-[auto_1fr_auto_auto]"
            items={data()}
            headerData={['Id', 'Name', 'Status', 'Last Modified']}
            columnCount={4}
          >
            {(item, index) => {
              const isFirstRow = index() === 0;
              const isLastRow = index() === data().length - 1;

              return (
                <>
                  <GridTable.Data isFirstRow={isFirstRow} isLastRow={isLastRow} isStartOfRow>
                    {item.id}
                  </GridTable.Data>
                  <GridTable.Data isFirstRow={isFirstRow} isLastRow={isLastRow}>
                    {item.name}
                  </GridTable.Data>
                  <GridTable.Data isFirstRow={isFirstRow} isLastRow={isLastRow}>
                    {item.status}
                  </GridTable.Data>
                  <GridTable.Data isFirstRow={isFirstRow} isLastRow={isLastRow} class="justify-center" isEndOfRow>
                    {item.date}
                  </GridTable.Data>
                </>
              );
            }}
          </GridTable.Simple>
        </Page.ContentSection>
      </SandboxExamplesContainer>
    </AutoScrollArea>
  );
};

export const ScrollInScroll = () => {
  const autoScrollAreaComponentRef = componentRefUtils.createRef<AutoScrollAreaComponentRef>();

  const [data, setData] = createSignal<GridData[]>(gridData);
  let addingTimeoutId: ReturnType<typeof setTimeout>;

  const addData = () => {
    setData((prevData) => [...prevData, ...gridData]);

    addingTimeoutId = setTimeout(() => {
      addData();
    }, 1000);
  };

  const addSingleData = () => {
    setData((prevData) => [...prevData, gridData[0]]);
  };

  const handleStopAdding = () => {
    clearTimeout(addingTimeoutId);
  };

  const handleStartAdding = () => {
    addData();
  };

  return (
    <>
      <Button onClick={handleStartAdding}>Start Adding</Button>
      <Button onClick={handleStopAdding}>Stop Adding</Button>
      <Button onClick={addSingleData}>Add Single Data</Button>
      <Button onClick={() => autoScrollAreaComponentRef.api()?.setAutoScrollState(AutoScrollState.ENABLED)}>
        Enable Auto Scroll
      </Button>
      <Button onClick={() => autoScrollAreaComponentRef.api()?.setAutoScrollState(AutoScrollState.DISABLED)}>
        Disable Auto Scroll
      </Button>
      <Button onClick={() => autoScrollAreaComponentRef.api()?.setAutoScrollState(AutoScrollState.FORCE_DISABLED)}>
        Force Disabled Auto Scroll
      </Button>
      <div class="h-[200px]">
        <ScrollArea>
          <SandboxExamplesContainer>
            <Page.ContentSection>
              <AutoScrollArea autoScrollAreaComponentRef={autoScrollAreaComponentRef}>
                <GridTable.Simple
                  class="grid-cols-[auto_1fr_auto_auto]"
                  items={data()}
                  headerData={['Id', 'Name', 'Status', 'Last Modified']}
                  columnCount={4}
                >
                  {(item, index) => {
                    const isFirstRow = index() === 0;
                    const isLastRow = index() === data().length - 1;

                    return (
                      <>
                        <GridTable.Data isFirstRow={isFirstRow} isLastRow={isLastRow} isStartOfRow>
                          {item.id}
                        </GridTable.Data>
                        <GridTable.Data isFirstRow={isFirstRow} isLastRow={isLastRow}>
                          {item.name}
                        </GridTable.Data>
                        <GridTable.Data isFirstRow={isFirstRow} isLastRow={isLastRow}>
                          {item.status}
                        </GridTable.Data>
                        <GridTable.Data isFirstRow={isFirstRow} isLastRow={isLastRow} class="justify-center" isEndOfRow>
                          {item.date}
                        </GridTable.Data>
                      </>
                    );
                  }}
                </GridTable.Simple>
              </AutoScrollArea>
            </Page.ContentSection>
          </SandboxExamplesContainer>
        </ScrollArea>
      </div>
    </>
  );
};

export const ScrollingHeightByDefault = () => {
  const [data, setData] = createSignal<GridData[]>([
    ...gridData,
    ...gridData,
    ...gridData,
    ...gridData,
    ...gridData,
    ...gridData,
    ...gridData,
    ...gridData,
    ...gridData,
  ]);
  let addingTimeoutId: ReturnType<typeof setTimeout>;

  const addData = () => {
    setData((prevData) => [...prevData, ...gridData]);

    addingTimeoutId = setTimeout(() => {
      addData();
    }, 1000);
  };

  const handleStopAdding = () => {
    clearTimeout(addingTimeoutId);
  };

  const handleStartAdding = () => {
    addData();
  };

  return (
    <AutoScrollArea>
      <Button onClick={handleStartAdding}>Start Adding</Button>
      <Button onClick={handleStopAdding}>Stop Adding</Button>
      {/* <Button onClick={autoScrollStore.enableAutoScroll}>Enable Auto Scroll</Button>
      <Button onClick={autoScrollStore.disableAutoScroll}>Disable Auto Scroll</Button> */}
      <SandboxExamplesContainer>
        <Page.ContentSection>
          <GridTable.Simple
            class="grid-cols-[auto_1fr_auto_auto]"
            items={data()}
            headerData={['Id', 'Name', 'Status', 'Last Modified']}
            columnCount={4}
          >
            {(item, index) => {
              const isFirstRow = index() === 0;
              const isLastRow = index() === data().length - 1;

              return (
                <>
                  <GridTable.Data isFirstRow={isFirstRow} isLastRow={isLastRow} isStartOfRow>
                    {item.id}
                  </GridTable.Data>
                  <GridTable.Data isFirstRow={isFirstRow} isLastRow={isLastRow}>
                    {item.name}
                  </GridTable.Data>
                  <GridTable.Data isFirstRow={isFirstRow} isLastRow={isLastRow}>
                    {item.status}
                  </GridTable.Data>
                  <GridTable.Data isFirstRow={isFirstRow} isLastRow={isLastRow} class="justify-center" isEndOfRow>
                    {item.date}
                  </GridTable.Data>
                </>
              );
            }}
          </GridTable.Simple>
        </Page.ContentSection>
      </SandboxExamplesContainer>
    </AutoScrollArea>
  );
};
