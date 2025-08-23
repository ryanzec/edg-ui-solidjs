import { type Accessor, createMemo, For, type JSX, mergeProps, Show, splitProps } from 'solid-js';
import AutoScrollArea from '$/core/components/auto-scroll-area';
import Checkbox from '$/core/components/checkbox';
import FormField from '$/core/components/form-field';
import GridEmptyData from '$/core/components/grid-table/grid-empty-data';
import GridTable, { type GridTableProps } from '$/core/components/grid-table/grid-table';
import GridTableFooter from '$/core/components/grid-table/grid-table-footer';
import GridTableHeaderData from '$/core/components/grid-table/grid-table-header-data';
import GridTableSelectedActions from '$/core/components/grid-table/grid-table-selected-actions';
import type { GridTableHeaderDataOptions } from '$/core/components/grid-table/utils';
import ScrollArea from '$/core/components/scroll-area';
import { loggerUtils } from '$/core/utils/logger';
import { tailwindUtils } from '$/core/utils/tailwind';

export type SimpleGridTableProps<TRowData> = Omit<GridTableProps, 'children'> & {
  items?: TRowData[];
  headerData?: (string | GridTableHeaderDataOptions)[];
  children: (row: TRowData, index: Accessor<number>) => JSX.Element;
  hasActions?: boolean;
  columnCount: number;
  selectedItems?: TRowData[];
  setSelectedItems?: (items: TRowData[]) => void;
  selectedActionElement?: JSX.Element;
  contentClass?: string;
  enableAutoScroll?: boolean;
};

const SimpleGridTable = <TRowData,>(passedProps: SimpleGridTableProps<TRowData>) => {
  const [props, restOfProps] = splitProps(mergeProps({ hasActions: false, enableAutoScroll: false }, passedProps), [
    'items',
    'headerData',
    'children',
    'hasActions',
    'columnCount',
    'selectedItems',
    'setSelectedItems',
    'selectedActionElement',
    'footerElement',
    'contentClass',
    'enableAutoScroll',
  ]);

  const currentDisplayedItemsSelectedCount = createMemo<number>(() => {
    if (!props.selectedItems || !props.items || props.items.length === 0) {
      return 0;
    }

    // converting to a set to improve performance
    const filterArray = new Set(props.items);

    return props.selectedItems.filter((item) => filterArray.has(item)).length;
  });

  const allItemsSelected = createMemo<boolean>(() => {
    if (!props.items || props.items.length === 0) {
      return false;
    }

    for (const item of props.items) {
      if (!props.selectedItems?.includes(item)) {
        return false;
      }
    }

    return true;
  });

  const handleSelectAll = () => {
    if (!props.setSelectedItems || !props.items || props.items.length === 0) {
      loggerUtils.warn({
        type: 'invalid-grid-table-select-all',
        selectedItemsPassed: !!props.selectedItems,
        itemsCount: props.items?.length || 0,
      });

      return;
    }

    if (allItemsSelected()) {
      props.setSelectedItems([...(props.selectedItems || []).filter((item) => !props.items?.includes(item))]);

      return;
    }

    const newItems: TRowData[] = [];

    for (const item of props.items) {
      if (!props.selectedItems?.includes(item)) {
        newItems.push(item);
      }
    }

    props.setSelectedItems([...(props.selectedItems || []), ...newItems]);
  };

  return (
    <div class="flex flex-col min-h-[0]">
      <Show when={props.selectedItems}>
        {(selectedItems) => (
          <GridTableSelectedActions selectedItems={selectedItems()}>
            {props.selectedActionElement}
          </GridTableSelectedActions>
        )}
      </Show>
      <GridTable {...restOfProps}>
        <Show when={props.headerData && props.headerData.length > 0}>
          <Show when={props.setSelectedItems}>
            <GridTableHeaderData isFirstColumn>
              <FormField>
                <Checkbox
                  onChange={handleSelectAll}
                  checked={allItemsSelected()}
                  indeterminate={currentDisplayedItemsSelectedCount() > 0 && !allItemsSelected()}
                />
              </FormField>
            </GridTableHeaderData>
          </Show>
          <For each={props.headerData}>
            {(header, index) => {
              const finalHeader = (): GridTableHeaderDataOptions => {
                if (typeof header === 'object') {
                  return header;
                }
                return {
                  element: () => header,
                };
              };

              return (
                <GridTableHeaderData
                  onSortChange={finalHeader().onSortChange}
                  sortDirection={finalHeader().sortDirection}
                  sortKey={finalHeader().sortKey}
                  class={finalHeader().cssClass}
                  isFirstColumn={!props.setSelectedItems && index() === 0}
                  isLastColumn={props.hasActions === false && index() === (props.headerData || []).length - 1}
                >
                  {finalHeader().element()}
                </GridTableHeaderData>
              );
            }}
          </For>
        </Show>
        <Show when={props.hasActions}>
          <GridTableHeaderData isLastColumn />
        </Show>
      </GridTable>
      <Show when={props.items && props.items.length > 0} fallback={<GridEmptyData columnCount={props.columnCount} />}>
        <ScrollArea class={tailwindUtils.merge('border-b border-outline rounded-b-sm mb-[-1px]', props.contentClass)}>
          <Show when={props.enableAutoScroll}>
            <AutoScrollArea>
              <GridTable {...restOfProps}>
                <For each={props.items}>{props.children}</For>
              </GridTable>
            </AutoScrollArea>
          </Show>
          <Show when={!props.enableAutoScroll}>
            <GridTable {...restOfProps}>
              <For each={props.items}>{props.children}</For>
            </GridTable>
          </Show>
        </ScrollArea>
      </Show>
      <Show when={props.footerElement}>
        <GridTableFooter>{props.footerElement}</GridTableFooter>
      </Show>
    </div>
  );
};

export default SimpleGridTable;
