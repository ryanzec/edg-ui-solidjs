import { default as DefaultPagination, type PaginationProps } from '$/core/components/pagination/pagination';
import Cursor, { type PaginationCursorProps } from '$/core/components/pagination/pagination-cursor';
import { paginationComponentUtils } from '$/core/components/pagination/utils';

export { paginationComponentUtils };

export type { PaginationProps, PaginationCursorProps };

const Pagination = Object.assign(DefaultPagination, {
  Cursor,
});

export default Pagination;
