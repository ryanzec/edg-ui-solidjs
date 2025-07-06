import GridTable, { type GridTableProps } from '$/core/components/grid-table/grid-table';
import GridTableHeaderData from '$/core/components/grid-table/grid-table-header-data';
import type { GridTableHeaderDataOptions } from '$/core/components/grid-table/utils';
import { ScrollArea, type ScrollAreaVirtualProps } from '$/core/components/scroll-area';
import { tailwindUtils } from '$/core/utils/tailwind';
import { For, Show, mergeProps, splitProps } from 'solid-js';
import GridEmptyData from './grid-empty-data';

export type VirtualGridTableProps<TRowData> = Omit<GridTableProps, 'children'> & {
  headerData?: (string | GridTableHeaderDataOptions)[];
  virtualProps: Omit<ScrollAreaVirtualProps<TRowData>, 'children'>;
  children: ScrollAreaVirtualProps<TRowData>['children'];
  hasExtraRow?: boolean;
  scrollAreaClass?: string;
  virtualizedElementRef?: (element: HTMLElement | undefined) => void;
  columnCount: number;
  hasActions?: boolean;
};

const VirtualGridTable = <TRowData,>(passedProps: VirtualGridTableProps<TRowData>) => {
  const [props, restOfProps] = splitProps(mergeProps({ hasActions: false }, passedProps), [
    'virtualizedElementRef',
    'headerData',
    'virtualProps',
    'children',
    'hasExtraRow',
    'scrollAreaClass',
    'columnCount',
    'hasActions',
  ]);

  return (
    <>
      <GridTable {...restOfProps}>
        <Show when={props.headerData && props.headerData.length > 0}>
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
                  isFirstColumn={index() === 0}
                  isLastColumn={props.hasActions === false && index() === (props.headerData || []).length - 1}
                >
                  {finalHeader().element()}
                </GridTableHeaderData>
              );
            }}
          </For>
          {props.hasActions && <GridTableHeaderData isLastColumn />}
        </Show>
      </GridTable>
      <Show when={props.virtualProps.items.length > 0} fallback={<GridEmptyData columnCount={props.columnCount} />}>
        <ScrollArea.Virtual
          class={tailwindUtils.merge('border-b border-outline rounded-b-sm mb-[-1px]', props.scrollAreaClass)}
          {...props.virtualProps}
          hasExtraRow={props.hasExtraRow}
          virtualizedElementRef={props.virtualizedElementRef}
        >
          {props.children}
        </ScrollArea.Virtual>
      </Show>
    </>
  );
};

export default VirtualGridTable;
