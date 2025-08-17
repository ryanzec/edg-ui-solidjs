import type { JSX } from 'solid-js';
import type { GridTableHeaderDataProps } from '$/core/components/grid-table/grid-table-header-data';

export type GridTableHeaderDataOptions = {
  element: () => JSX.Element;
  cssClass?: string;
  onSortChange?: GridTableHeaderDataProps['onSortChange'];
  sortDirection?: GridTableHeaderDataProps['sortDirection'];
  sortKey?: GridTableHeaderDataProps['sortKey'];
};
