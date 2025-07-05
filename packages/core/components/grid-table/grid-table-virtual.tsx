import GridTable, { type GridTableProps } from '$/core/components/grid-table/grid-table';
import GridTableHeaderData from '$/core/components/grid-table/grid-table-header-data';
import type { GridTableHeaderDataOptions } from '$/core/components/grid-table/utils';
import { ScrollArea, type ScrollAreaVirtualProps } from '$/core/components/scroll-area';
import { splitProps } from 'solid-js';

export type VirtualGridTableProps<TRowData> = Omit<GridTableProps, 'children'> & {
  headerData: (string | GridTableHeaderDataOptions)[];
  virtualProps: Omit<ScrollAreaVirtualProps<TRowData>, 'children'>;
  children: ScrollAreaVirtualProps<TRowData>['children'];
  hasExtraRow?: boolean;
  scrollAreaClass?: string;
  virtualizedElementRef?: (element: HTMLElement | undefined) => void;
};

const VirtualGridTable = <TRowData,>(passedProps: VirtualGridTableProps<TRowData>) => {
  const [props, restOfProps] = splitProps(passedProps, [
    'virtualizedElementRef',
    'headerData',
    'virtualProps',
    'children',
    'hasExtraRow',
    'scrollAreaClass',
  ]);

  return (
    <>
      <GridTable {...restOfProps}>
        {props.headerData.map((header, index) => {
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
            >
              {finalHeader().element()}
            </GridTableHeaderData>
          );
        })}
      </GridTable>
      <ScrollArea.Virtual
        class={props.scrollAreaClass}
        {...props.virtualProps}
        hasExtraRow={props.hasExtraRow}
        virtualizedElementRef={props.virtualizedElementRef}
      >
        {props.children}
      </ScrollArea.Virtual>
    </>
  );
};

export default VirtualGridTable;
