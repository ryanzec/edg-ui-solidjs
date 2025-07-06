import GridTable, { type GridTableProps } from '$/core/components/grid-table/grid-table';
import GridTableHeaderData from '$/core/components/grid-table/grid-table-header-data';
import type { GridTableHeaderDataOptions } from '$/core/components/grid-table/utils';
import { type Accessor, For, type JSX, Show, mergeProps, splitProps } from 'solid-js';
import GridEmptyData from './grid-empty-data';

export type SimpleGridTableProps<TRowData> = Omit<GridTableProps, 'children'> & {
  items?: TRowData[];
  headerData?: (string | GridTableHeaderDataOptions)[];
  children: (row: TRowData, index: Accessor<number>) => JSX.Element;
  hasActions?: boolean;
  columnCount: number;
};

const SimpleGridTable = <TRowData,>(passedProps: SimpleGridTableProps<TRowData>) => {
  const [props, restOfProps] = splitProps(mergeProps({ hasActions: false }, passedProps), [
    'items',
    'headerData',
    'children',
    'hasActions',
    'columnCount',
  ]);

  return (
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
      </Show>
      {props.hasActions && <GridTableHeaderData isLastColumn />}
      <Show when={props.items && props.items.length > 0} fallback={<GridEmptyData columnCount={props.columnCount} />}>
        <For each={props.items}>{props.children}</For>
      </Show>
    </GridTable>
  );
};

export default SimpleGridTable;
