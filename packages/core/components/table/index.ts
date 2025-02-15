import Table, { type TableProps } from '$/core/components/table/table';
import Data, { type TableDataProps } from '$/core/components/table/table-data';
import Header, { type TableHeaderProps } from '$/core/components/table/table-header';
import Row, { type TableRowProps } from '$/core/components/table/table-row';

export { TableShape } from '$/core/components/table/utils';
export type { TableProps, TableRowProps, TableDataProps, TableHeaderProps };

export default Object.assign(Table, { Row, Data, Header });
