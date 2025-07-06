import { Page } from '$/application/components/page';
import GridTable from '$/core/components/grid-table';
import { GridTableSortDirection } from '$/core/components/grid-table/grid-table-header-data';
import List from '$/core/components/list';
import PaginationComponent, { type PaginationCursorProps } from '$/core/components/pagination';
import { tooltipComponentUtils } from '$/core/components/tooltip';
import { paginationStoreUtils } from '$/core/stores/pagination.store';
import { asyncUtils } from '$/core/utils/async';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';
import { createEffect, createMemo, createSignal } from 'solid-js';

export default {
  title: 'Components/GridTable',
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

export interface ComplexData {
  id: string;
  name: string;
  severity: string;
  lastModified: string;
  author: {
    name: string;
  };
}

const newData: ComplexData[] = [
  {
    id: '1',
    name: 'Pride and Prejudice',
    severity: 'Critical',
    lastModified: '02/02/25',
    author: {
      name: 'Jane Austen',
    },
  },
  {
    id: '2',
    name: 'To Kill a Mockingbird',
    severity: 'High',
    lastModified: '02/02/25',
    author: {
      name: 'Alexander Yamamoto',
    },
  },
  {
    id: '3',
    name: 'The Catcher in the Rye',
    severity: 'Critical',
    lastModified: '02/02/25',
    author: {
      name: 'J.D. Salinger',
    },
  },
  {
    id: '4',
    name: 'Lord of the Flies',
    severity: 'Medium',
    lastModified: '02/02/25',
    author: {
      name: 'William Golding',
    },
  },
  {
    id: '5',
    name: 'Animal Farm',
    severity: 'Critical',
    lastModified: '02/02/25',
    author: {
      name: 'George Orwell',
    },
  },
  {
    id: '6',
    name: 'The Hobbit',
    severity: 'Critical',
    lastModified: '02/02/25',
    author: {
      name: 'J.R.R. Tolkien',
    },
  },
  {
    id: '7',
    name: '1984',
    severity: 'Low',
    lastModified: '02/02/25',
    author: {
      name: 'George Orwell',
    },
  },
  {
    id: '8',
    name: 'Brave New World',
    severity: 'None',
    lastModified: '02/02/25',
    author: {
      name: 'Aldous Huxley',
    },
  },
  {
    id: '9',
    name: 'The Great Gatsby',
    severity: 'High',
    lastModified: '02/02/25',
    author: {
      name: 'F. Scott Fitzgerald',
    },
  },
  {
    id: '10',
    name: 'Fahrenheit 451',
    severity: 'High',
    lastModified: '02/02/25',
    author: {
      name: 'Ray Bradbury',
    },
  },
];

let newLargeData: ComplexData[] = [];

// 10 per loop so this == 10000
for (let i = 0; i < 1000; i++) {
  newLargeData = newLargeData.concat(newData.map((item) => ({ ...item, id: `${i}${item.id}` })));
}

export const Default = () => {
  return (
    <SandboxExamplesContainer>
      <Page.ContentSection>
        <GridTable.Simple
          class="grid-cols-[auto_1fr_auto_auto]"
          items={gridData}
          headerData={['Id', 'Name', 'Status', 'Last Modified']}
          columnCount={4}
        >
          {(item, index) => {
            const isFirstRow = index() === 0;
            const isLastRow = index() === gridData.length - 1;

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
  );
};

export const Empty = () => {
  return (
    <SandboxExamplesContainer>
      <Page.ContentSection>
        <GridTable.Simple
          class="grid-cols-[auto_1fr_auto_auto]"
          items={[] as GridData[]}
          headerData={['Id', 'Name', 'Status', 'Last Modified']}
          columnCount={4}
        >
          {(item, index) => {
            const isFirstRow = index() === 0;
            const isLastRow = index() === gridData.length - 1;

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
  );
};

export const Linked = () => {
  return (
    <SandboxExamplesContainer>
      <Page.ContentSection>
        <GridTable.Simple
          class="grid-cols-[auto_1fr_auto_auto_auto]"
          items={gridData}
          headerData={['Id', 'Name', 'Status', 'Last Modified']}
          hasActions
          columnCount={5}
        >
          {(item, index) => {
            const isFirstRow = index() === 0;
            const isLastRow = index() === gridData.length - 1;
            const dropDownStore = tooltipComponentUtils.createStore();

            // biome-ignore lint/suspicious/noExplicitAny: just for sandbox
            const handleEdit = (data: any) => {
              console.log('edit', data);

              dropDownStore.hide();
            };

            return (
              <>
                <GridTable.Data linkUrl="https://google.com" isFirstRow={isFirstRow} isLastRow={isLastRow} isStartOfRow>
                  {item.id}
                </GridTable.Data>
                <GridTable.Data linkUrl="https://google.com" isFirstRow={isFirstRow} isLastRow={isLastRow}>
                  {item.name}
                </GridTable.Data>
                <GridTable.Data linkUrl="https://google.com" isFirstRow={isFirstRow} isLastRow={isLastRow}>
                  {item.status}
                </GridTable.Data>
                <GridTable.Data linkUrl="https://google.com" isFirstRow={isFirstRow} isLastRow={isLastRow}>
                  {item.date}
                </GridTable.Data>
                <GridTable.DataActions
                  isFirstRow={isFirstRow}
                  isLastRow={isLastRow}
                  actionsTooltipStore={dropDownStore}
                  contentElement={<List.Item onClick={() => handleEdit(item)}>Edit</List.Item>}
                  isEndOfRow
                />
              </>
            );
          }}
        </GridTable.Simple>
      </Page.ContentSection>
    </SandboxExamplesContainer>
  );
};

export const ExtraContent = () => {
  return (
    <SandboxExamplesContainer>
      <Page.ContentSection>
        <GridTable.Simple
          class="grid-cols-[auto_1fr_auto_auto_auto]"
          items={gridData}
          headerData={['Id', 'Name', 'Status', 'Last Modified']}
          hasActions
          columnCount={5}
        >
          {(item, index) => {
            const isFirstRow = index() === 0;
            const isLastRow = index() === gridData.length - 1;
            const [isExpanded, setIsExpanded] = createSignal(false);
            const dropDownStore = tooltipComponentUtils.createStore();

            // biome-ignore lint/suspicious/noExplicitAny: just for sandbox
            const handleEdit = (data: any) => {
              console.log('edit', data);

              dropDownStore.hide();
            };

            const handleExpand = () => {
              setIsExpanded(!isExpanded());

              dropDownStore.hide();
            };

            return (
              <>
                <GridTable.Data
                  onClick={handleExpand}
                  isExpanded={isExpanded()}
                  isFirstRow={isFirstRow}
                  isLastRow={isLastRow}
                  isStartOfRow
                >
                  {item.id}
                </GridTable.Data>
                <GridTable.Data
                  onClick={handleExpand}
                  isExpanded={isExpanded()}
                  isFirstRow={isFirstRow}
                  isLastRow={isLastRow}
                >
                  {item.name}
                </GridTable.Data>
                <GridTable.Data
                  onClick={handleExpand}
                  isExpanded={isExpanded()}
                  isFirstRow={isFirstRow}
                  isLastRow={isLastRow}
                >
                  {item.status}
                </GridTable.Data>
                <GridTable.Data
                  onClick={handleExpand}
                  isExpanded={isExpanded()}
                  isFirstRow={isFirstRow}
                  isLastRow={isLastRow}
                >
                  {item.date}
                </GridTable.Data>
                <GridTable.DataActions
                  isFirstRow={isFirstRow}
                  isLastRow={isLastRow}
                  isExpanded={isExpanded()}
                  actionsTooltipStore={dropDownStore}
                  contentElement={
                    <>
                      <List.Item onClick={() => handleEdit(item)}>Edit</List.Item>
                      <List.Item onClick={handleExpand}>Expand</List.Item>
                    </>
                  }
                  isEndOfRow
                />
                <GridTable.ExpandableContent isExpanded={isExpanded()} isLastRow={isLastRow} columnCount={5}>
                  <h4>Additional Details</h4>
                  <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span class="text-gray-600">Email:</span>
                      <span class="text-gray-900 ml-2">bob.johnson@example.com</span>
                    </div>
                    <div>
                      <span class="text-gray-600">Phone:</span>
                      <span class="text-gray-900 ml-2">(555) 123-4567</span>
                    </div>
                    <div>
                      <span class="text-gray-600">Department:</span>
                      <span class="text-gray-900 ml-2">Engineering</span>
                    </div>
                    <div>
                      <span class="text-gray-600">Last Login:</span>
                      <span class="text-gray-900 ml-2">2024-01-08</span>
                    </div>
                  </div>
                </GridTable.ExpandableContent>
              </>
            );
          }}
        </GridTable.Simple>
      </Page.ContentSection>
    </SandboxExamplesContainer>
  );
};

export const Pagination = () => {
  const paginationStore = paginationStoreUtils.createStore({
    totalItems: newLargeData.length,
  });

  const currentItems = () => {
    const offsets = paginationStore.currentItemOffsets();

    return newLargeData.slice(offsets[0], offsets[1]);
  };

  const handlePageChange = async (previousPage: number, newPage: number) => {
    console.log(`Page changed from ${previousPage} to ${newPage} ${newPage === 5}`);

    if (newPage === 5) {
      return false;
    }

    return true;
  };

  return (
    <SandboxExamplesContainer>
      <Page.ContentSection>
        <GridTable.Simple
          class="grid-cols-[1fr_auto_auto_auto]"
          items={currentItems()}
          headerData={['Title', 'Severity', 'Last Modified', 'Author']}
          footerElement={<PaginationComponent paginationStore={paginationStore} onPageChange={handlePageChange} />}
          columnCount={4}
        >
          {(row, index) => {
            const isFirstRow = index() === 0;
            const isLastRow = index() === currentItems().length - 1;

            return (
              <>
                <GridTable.Data isFirstRow={isFirstRow} isLastRow={isLastRow} isStartOfRow>
                  {row.name}
                </GridTable.Data>
                <GridTable.Data isFirstRow={isFirstRow} isLastRow={isLastRow}>
                  {row.severity}
                </GridTable.Data>
                <GridTable.Data isFirstRow={isFirstRow} isLastRow={isLastRow}>
                  {row.lastModified}
                </GridTable.Data>
                <GridTable.Data isFirstRow={isFirstRow} isLastRow={isLastRow} isEndOfRow>
                  {row.author.name}
                </GridTable.Data>
              </>
            );
          }}
        </GridTable.Simple>
      </Page.ContentSection>
    </SandboxExamplesContainer>
  );
};

export const PaginationCursor = () => {
  const paginationStore = paginationStoreUtils.createCursorStore({
    defaultPreviousCursor: '',
    defaultNextCursor: '1',
  });

  const currentItems = () => {
    return newLargeData.slice(0, 10);
  };

  const handlePageChange: PaginationCursorProps['onPageChange'] = async (cursorToLoad, direction) => {
    console.log(cursorToLoad, direction);

    return {
      newPreviousCursor: Math.random() > 0.5 ? '1' : undefined,
      newNextCursor: '2',
    };
  };

  return (
    <SandboxExamplesContainer>
      <Page.ContentSection>
        <GridTable.Simple
          class="grid-cols-[1fr_auto_auto_auto]"
          items={currentItems()}
          headerData={['Title', 'Severity', 'Last Modified', 'Author']}
          footerElement={
            <PaginationComponent.Cursor cursorPaginationStore={paginationStore} onPageChange={handlePageChange} />
          }
          columnCount={4}
        >
          {(row, index) => {
            const isFirstRow = index() === 0;
            const isLastRow = index() === currentItems().length - 1;

            return (
              <>
                <GridTable.Data isFirstRow={isFirstRow} isLastRow={isLastRow} isStartOfRow>
                  {row.name}
                </GridTable.Data>
                <GridTable.Data isFirstRow={isFirstRow} isLastRow={isLastRow}>
                  {row.severity}
                </GridTable.Data>
                <GridTable.Data isFirstRow={isFirstRow} isLastRow={isLastRow}>
                  {row.lastModified}
                </GridTable.Data>
                <GridTable.Data isFirstRow={isFirstRow} isLastRow={isLastRow} isEndOfRow>
                  {row.author.name}
                </GridTable.Data>
              </>
            );
          }}
        </GridTable.Simple>
      </Page.ContentSection>
    </SandboxExamplesContainer>
  );
};

export const PaginationWithDelay = () => {
  const paginationStore = paginationStoreUtils.createStore({
    totalItems: newLargeData.length,
  });

  const currentItems = () => {
    const offsets = paginationStore.currentItemOffsets();

    return newLargeData.slice(offsets[0], offsets[1]);
  };

  const handlePageChange = async (previousPage: number, newPage: number) => {
    console.log(`Page changed from ${previousPage} to ${newPage} ${newPage === 5}`);

    paginationStore.setIsLoading(true);

    await asyncUtils.sleep(1000);

    if (newPage === 5) {
      paginationStore.setIsLoading(false);

      return false;
    }

    paginationStore.setIsLoading(false);

    return true;
  };

  return (
    <SandboxExamplesContainer>
      <Page.ContentSection>
        <GridTable.Simple
          class="grid-cols-[1fr_auto_auto_auto]"
          items={currentItems()}
          headerData={['Title', 'Severity', 'Last Modified', 'Author']}
          footerElement={<PaginationComponent paginationStore={paginationStore} onPageChange={handlePageChange} />}
          columnCount={4}
        >
          {(row, index) => {
            const isFirstRow = index() === 0;
            const isLastRow = index() === currentItems().length - 1;

            return (
              <>
                <GridTable.Data isFirstRow={isFirstRow} isLastRow={isLastRow} isStartOfRow>
                  {row.name}
                </GridTable.Data>
                <GridTable.Data isFirstRow={isFirstRow} isLastRow={isLastRow}>
                  {row.severity}
                </GridTable.Data>
                <GridTable.Data isFirstRow={isFirstRow} isLastRow={isLastRow}>
                  {row.lastModified}
                </GridTable.Data>
                <GridTable.Data isFirstRow={isFirstRow} isLastRow={isLastRow} isEndOfRow>
                  {row.author.name}
                </GridTable.Data>
              </>
            );
          }}
        </GridTable.Simple>
      </Page.ContentSection>
    </SandboxExamplesContainer>
  );
};

export const PaginationWithCustomDefaultCurrentPage = () => {
  const paginationStore = paginationStoreUtils.createStore({
    totalItems: newLargeData.length,
    defaultCurrentPage: 95,
    itemsPerPage: 5,
  });

  const currentItems = () => {
    const offsets = paginationStore.currentItemOffsets();

    return newLargeData.slice(offsets[0], offsets[1]);
  };

  const handlePageChange = async (previousPage: number, newPage: number) => {
    console.log(`Page changed from ${previousPage} to ${newPage}`);

    return true;
  };

  return (
    <SandboxExamplesContainer>
      <Page.ContentSection>
        <GridTable.Simple
          class="grid-cols-[1fr_auto_auto_auto]"
          items={currentItems()}
          headerData={['Title', 'Severity', 'Last Modified', 'Author']}
          footerElement={<PaginationComponent paginationStore={paginationStore} onPageChange={handlePageChange} />}
          columnCount={4}
        >
          {(row, index) => {
            const isFirstRow = index() === 0;
            const isLastRow = index() === currentItems().length - 1;

            return (
              <>
                <GridTable.Data isFirstRow={isFirstRow} isLastRow={isLastRow} isStartOfRow>
                  {row.name}
                </GridTable.Data>
                <GridTable.Data isFirstRow={isFirstRow} isLastRow={isLastRow}>
                  {row.severity}
                </GridTable.Data>
                <GridTable.Data isFirstRow={isFirstRow} isLastRow={isLastRow}>
                  {row.lastModified}
                </GridTable.Data>
                <GridTable.Data isFirstRow={isFirstRow} isLastRow={isLastRow} isEndOfRow>
                  {row.author.name}
                </GridTable.Data>
              </>
            );
          }}
        </GridTable.Simple>
      </Page.ContentSection>
    </SandboxExamplesContainer>
  );
};

export const PaginationWithOptionsExample = () => {
  const paginationStore = paginationStoreUtils.createStore({
    totalItems: newLargeData.length,
    defaultCurrentPage: 3,
    itemsPerPage: 5,
    surroundingPages: 1,
  });

  const currentItems = () => {
    const offsets = paginationStore.currentItemOffsets();

    return newLargeData.slice(offsets[0], offsets[1]);
  };

  const handlePageChange = async (previousPage: number, newPage: number) => {
    console.log(`Page changed from ${previousPage} to ${newPage}`);

    return true;
  };

  return (
    <SandboxExamplesContainer>
      <Page.ContentSection>
        <GridTable.Simple
          class="grid-cols-[1fr_auto_auto_auto]"
          items={currentItems()}
          headerData={['Title', 'Severity', 'Last Modified', 'Author']}
          footerElement={<PaginationComponent paginationStore={paginationStore} onPageChange={handlePageChange} />}
          columnCount={4}
        >
          {(row, index) => {
            const isFirstRow = index() === 0;
            const isLastRow = index() === currentItems().length - 1;

            return (
              <>
                <GridTable.Data isFirstRow={isFirstRow} isLastRow={isLastRow} isStartOfRow>
                  {row.name}
                </GridTable.Data>
                <GridTable.Data isFirstRow={isFirstRow} isLastRow={isLastRow}>
                  {row.severity}
                </GridTable.Data>
                <GridTable.Data isFirstRow={isFirstRow} isLastRow={isLastRow}>
                  {row.lastModified}
                </GridTable.Data>
                <GridTable.Data isFirstRow={isFirstRow} isLastRow={isLastRow} isEndOfRow>
                  {row.author.name}
                </GridTable.Data>
              </>
            );
          }}
        </GridTable.Simple>
      </Page.ContentSection>
    </SandboxExamplesContainer>
  );
};

export const SinglePagePagination = () => {
  // Only 4 items but 5 items per page = 1 page total
  const singlePageItems = newData.slice(0, 4);
  const paginationStore = paginationStoreUtils.createStore({
    totalItems: newLargeData.length,
    defaultCurrentPage: 1,
    itemsPerPage: 5,
  });

  const handlePageChange = async (previousPage: number, newPage: number) => {
    console.log(`Page changed from ${previousPage} to ${newPage}`);

    return true;
  };

  return (
    <SandboxExamplesContainer>
      <Page.ContentSection>
        <GridTable.Simple
          class="grid-cols-[1fr_auto_auto_auto]"
          items={singlePageItems}
          headerData={['Title', 'Severity', 'Last Modified', 'Author']}
          footerElement={<PaginationComponent paginationStore={paginationStore} onPageChange={handlePageChange} />}
          columnCount={4}
        >
          {(row, index) => {
            const isFirstRow = index() === 0;
            const isLastRow = index() === singlePageItems.length - 1;

            return (
              <>
                <GridTable.Data isFirstRow={isFirstRow} isLastRow={isLastRow} isStartOfRow>
                  {row.name}
                </GridTable.Data>
                <GridTable.Data isFirstRow={isFirstRow} isLastRow={isLastRow}>
                  {row.severity}
                </GridTable.Data>
                <GridTable.Data isFirstRow={isFirstRow} isLastRow={isLastRow}>
                  {row.lastModified}
                </GridTable.Data>
                <GridTable.Data isFirstRow={isFirstRow} isLastRow={isLastRow} isEndOfRow>
                  {row.author.name}
                </GridTable.Data>
              </>
            );
          }}
        </GridTable.Simple>
      </Page.ContentSection>
    </SandboxExamplesContainer>
  );
};

export const PaginationWithNumbers = () => {
  const paginationStore = paginationStoreUtils.createStore({
    totalItems: newLargeData.length,
  });

  const currentItems = () => {
    const offsets = paginationStore.currentItemOffsets();

    return newLargeData.slice(offsets[0], offsets[1]);
  };

  const handlePageChange = async (previousPage: number, newPage: number) => {
    console.log(`Page changed from ${previousPage} to ${newPage} ${newPage === 5}`);

    if (newPage === 5) {
      return false;
    }

    return true;
  };

  return (
    <SandboxExamplesContainer>
      <Page.ContentSection>
        <GridTable.Simple
          class="grid-cols-[1fr_auto_auto_auto]"
          items={currentItems()}
          headerData={['Title', 'Severity', 'Last Modified', 'Author']}
          footerElement={
            <PaginationComponent paginationStore={paginationStore} onPageChange={handlePageChange} showNumbers />
          }
          columnCount={4}
        >
          {(row, index) => {
            const isFirstRow = index() === 0;
            const isLastRow = index() === currentItems().length - 1;

            return (
              <>
                <GridTable.Data isFirstRow={isFirstRow} isLastRow={isLastRow} isStartOfRow>
                  {row.name}
                </GridTable.Data>
                <GridTable.Data isFirstRow={isFirstRow} isLastRow={isLastRow}>
                  {row.severity}
                </GridTable.Data>
                <GridTable.Data isFirstRow={isFirstRow} isLastRow={isLastRow}>
                  {row.lastModified}
                </GridTable.Data>
                <GridTable.Data isFirstRow={isFirstRow} isLastRow={isLastRow} isEndOfRow>
                  {row.author.name}
                </GridTable.Data>
              </>
            );
          }}
        </GridTable.Simple>
      </Page.ContentSection>
    </SandboxExamplesContainer>
  );
};

export const Virtualized = () => {
  const tableCss = 'grid-cols-[1fr_110px_160px_180px]';

  return (
    <SandboxExamplesContainer>
      <Page.ContentSection>
        <GridTable.Virtual
          class={tableCss}
          scrollAreaClass="h-[500px]"
          headerData={['Title', 'Severity', 'Last Modified', 'Author']}
          virtualProps={{
            items: newLargeData,
            estimateSize: () => 37,
          }}
          columnCount={4}
        >
          {(index, virtualizer) => {
            const item = newLargeData[index];
            const isFirstRow = index === 0;
            const isLastRow = index === newLargeData.length - 1;
            const [isExpanded, setIsExpanded] = createSignal(false);
            const [elementRef, setElementRef] = createSignal<Element>();
            const dropDownStore = tooltipComponentUtils.createStore();

            // biome-ignore lint/suspicious/noExplicitAny: just for sandbox
            const handleEdit = (data: any) => {
              console.log('edit', data);

              dropDownStore.hide();
            };

            return (
              // biome-ignore lint/a11y/useSemanticElements: we do this to have a more flexible table component
              <GridTable class={tableCss} ref={setElementRef} data-index={index} role="row">
                <GridTable.Data isExpanded={isExpanded()} isFirstRow={isFirstRow} isStartOfRow>
                  {item.name}
                </GridTable.Data>
                <GridTable.Data isExpanded={isExpanded()} isFirstRow={isFirstRow}>
                  {item.severity}
                </GridTable.Data>
                <GridTable.Data isExpanded={isExpanded()} isFirstRow={isFirstRow}>
                  {item.lastModified}
                </GridTable.Data>
                <GridTable.Data isExpanded={isExpanded()} isFirstRow={isFirstRow} isEndOfRow>
                  {item.author.name}
                </GridTable.Data>
              </GridTable>
            );
          }}
        </GridTable.Virtual>
      </Page.ContentSection>
    </SandboxExamplesContainer>
  );
};

export const VirtualizedEmpty = () => {
  const tableCss = 'grid-cols-[1fr_110px_160px_180px]';

  return (
    <SandboxExamplesContainer>
      <Page.ContentSection>
        <GridTable.Virtual
          class={tableCss}
          scrollAreaClass="h-[500px]"
          headerData={['Title', 'Severity', 'Last Modified', 'Author']}
          virtualProps={{
            items: [] as ComplexData[],
            estimateSize: () => 64,
          }}
          columnCount={4}
        >
          {(index, virtualizer) => {
            const item = newLargeData[index];
            const isFirstRow = index === 0;
            const isLastRow = index === newLargeData.length - 1;
            const [isExpanded, setIsExpanded] = createSignal(false);
            const [elementRef, setElementRef] = createSignal<Element>();
            const dropDownStore = tooltipComponentUtils.createStore();

            // biome-ignore lint/suspicious/noExplicitAny: just for sandbox
            const handleEdit = (data: any) => {
              console.log('edit', data);

              dropDownStore.hide();
            };

            return (
              // biome-ignore lint/a11y/useSemanticElements: we do this to have a more flexible table component
              <GridTable class={tableCss} ref={setElementRef} data-index={index} role="row">
                <GridTable.Data isExpanded={isExpanded()} isFirstRow={isFirstRow} isStartOfRow>
                  {item.name}
                </GridTable.Data>
                <GridTable.Data isExpanded={isExpanded()} isFirstRow={isFirstRow}>
                  {item.severity}
                </GridTable.Data>
                <GridTable.Data isExpanded={isExpanded()} isFirstRow={isFirstRow}>
                  {item.lastModified}
                </GridTable.Data>
                <GridTable.Data isExpanded={isExpanded()} isFirstRow={isFirstRow} isEndOfRow>
                  {item.author.name}
                </GridTable.Data>
              </GridTable>
            );
          }}
        </GridTable.Virtual>
      </Page.ContentSection>
    </SandboxExamplesContainer>
  );
};

export const SortableSimple = () => {
  const [sortKey, setSortKey] = createSignal<string>();
  const [sortDirection, setSortDirection] = createSignal<GridTableSortDirection>(GridTableSortDirection.NONE);

  const headerData = createMemo(() => {
    return [
      'Id',
      {
        element: () => 'Name',
        onSortChange: (sortKey: string, newSortDirection: GridTableSortDirection) => {
          setSortKey(sortKey);
          setSortDirection(newSortDirection);

          console.log(`new sort: ${sortKey} ${newSortDirection}`);
        },
        sortDirection: sortKey() === 'name' ? sortDirection() : GridTableSortDirection.NONE,
        sortKey: 'name',
      },
      'Status',
      {
        element: () => 'Last Modified',
        onSortChange: (sortKey: string, newSortDirection: GridTableSortDirection) => {
          setSortKey(sortKey);
          setSortDirection(newSortDirection);

          console.log(`new sort: ${sortKey} ${newSortDirection}`);
        },
        sortDirection: sortKey() === 'lastModified' ? sortDirection() : GridTableSortDirection.NONE,
        sortKey: 'lastModified',
      },
    ];
  });

  return (
    <SandboxExamplesContainer>
      <Page.ContentSection>
        <GridTable.Simple
          class="grid-cols-[auto_1fr_auto_auto]"
          items={gridData}
          headerData={headerData()}
          columnCount={4}
        >
          {(item, index) => {
            const isFirstRow = index() === 0;
            const isLastRow = index() === gridData.length - 1;

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
  );
};

export const SortableVirtualized = () => {
  const [sortKey, setSortKey] = createSignal<string>();
  const [sortDirection, setSortDirection] = createSignal<GridTableSortDirection>(GridTableSortDirection.NONE);
  const tableCss = 'grid-cols-[1fr_110px_160px_180px]';

  return (
    <SandboxExamplesContainer>
      <Page.ContentSection>
        <GridTable.Virtual
          class={tableCss}
          scrollAreaClass="h-[500px]"
          headerData={[
            'Title',
            {
              element: () => 'Severity',
              onSortChange: (sortKey: string, newSortDirection: GridTableSortDirection) => {
                setSortKey(sortKey);
                setSortDirection(newSortDirection);

                console.log(`new sort: ${sortKey} ${newSortDirection}`);
              },
              sortDirection: sortKey() === 'severity' ? sortDirection() : GridTableSortDirection.NONE,
              sortKey: 'severity',
            },
            'Last Modified',
            {
              element: () => 'Author',
              onSortChange: (sortKey: string, newSortDirection: GridTableSortDirection) => {
                setSortKey(sortKey);
                setSortDirection(newSortDirection);

                console.log(`new sort: ${sortKey} ${newSortDirection}`);
              },
              sortDirection: sortKey() === 'author' ? sortDirection() : GridTableSortDirection.NONE,
              sortKey: 'author',
            },
          ]}
          virtualProps={{
            items: newLargeData,
            estimateSize: () => 64,
          }}
          columnCount={4}
        >
          {(index, virtualizer) => {
            const item = newLargeData[index];
            const isFirstRow = index === 0;
            const isLastRow = index === newLargeData.length - 1;
            const [isExpanded, setIsExpanded] = createSignal(false);
            const [elementRef, setElementRef] = createSignal<Element>();
            const dropDownStore = tooltipComponentUtils.createStore();

            // biome-ignore lint/suspicious/noExplicitAny: just for sandbox
            const handleEdit = (data: any) => {
              console.log('edit', data);

              dropDownStore.hide();
            };

            const handleExpand = () => {
              setIsExpanded(!isExpanded());

              dropDownStore.hide();
            };

            createEffect(function recalculateItemSize() {
              if (!elementRef()) {
                return;
              }

              virtualizer.measureElement(elementRef());
            });

            return (
              // biome-ignore lint/a11y/useSemanticElements: we do this to have a more flexible table component
              <GridTable class={tableCss} ref={setElementRef} data-index={index} role="row">
                <GridTable.Data onClick={handleExpand} isExpanded={isExpanded()} isFirstRow={isFirstRow} isStartOfRow>
                  {item.name}
                </GridTable.Data>
                <GridTable.Data onClick={handleExpand} isExpanded={isExpanded()} isFirstRow={isFirstRow}>
                  {item.severity}
                </GridTable.Data>
                <GridTable.Data onClick={handleExpand} isExpanded={isExpanded()} isFirstRow={isFirstRow}>
                  {item.lastModified}
                </GridTable.Data>
                <GridTable.Data onClick={handleExpand} isExpanded={isExpanded()} isFirstRow={isFirstRow} isEndOfRow>
                  {item.author.name}
                </GridTable.Data>
                <GridTable.ExpandableContent isExpanded={isExpanded()} columnCount={6}>
                  <h4>Additional Details</h4>
                  <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span class="text-gray-600">Email:</span>
                      <span class="text-gray-900 ml-2">bob.johnson@example.com</span>
                    </div>
                    <div>
                      <span class="text-gray-600">Phone:</span>
                      <span class="text-gray-900 ml-2">(555) 123-4567</span>
                    </div>
                    <div>
                      <span class="text-gray-600">Department:</span>
                      <span class="text-gray-900 ml-2">Engineering</span>
                    </div>
                    <div>
                      <span class="text-gray-600">Last Login:</span>
                      <span class="text-gray-900 ml-2">2024-01-08</span>
                    </div>
                  </div>
                </GridTable.ExpandableContent>
              </GridTable>
            );
          }}
        </GridTable.Virtual>
      </Page.ContentSection>
    </SandboxExamplesContainer>
  );
};
