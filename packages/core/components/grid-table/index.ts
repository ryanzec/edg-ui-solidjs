import { default as BaseGridTable, type GridTableProps } from '$/core/components/grid-table/grid-table';
import Data, { type GridTableDataProps } from '$/core/components/grid-table/grid-table-data';
import DataActions, { type GridTableDataActionsProps } from '$/core/components/grid-table/grid-table-data-actions';
import ExpandableContent, {
  type GridTableExpandableRowContentProps,
} from '$/core/components/grid-table/grid-table-expandable-content';
import Footer, { type GridTableFooterProps } from '$/core/components/grid-table/grid-table-footer';
import HeaderData, { type GridTableHeaderDataProps } from '$/core/components/grid-table/grid-table-header-data';
import Simple, { type SimpleGridTableProps } from '$/core/components/grid-table/grid-table-simple';
import Virtual, { type VirtualGridTableProps } from '$/core/components/grid-table/grid-table-virtual';
import type { GridTableHeaderDataOptions } from '$/core/components/grid-table/utils';

export type {
  GridTableProps,
  GridTableDataProps,
  GridTableExpandableRowContentProps,
  GridTableDataActionsProps,
  GridTableFooterProps,
  GridTableHeaderDataProps,
  SimpleGridTableProps,
  VirtualGridTableProps,
  GridTableHeaderDataOptions,
};

export const GridTable = Object.assign(BaseGridTable, {
  HeaderData,
  Data,
  ExpandableContent,
  DataActions,
  Footer,
  Simple,
  Virtual,
});

export default GridTable;
