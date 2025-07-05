import type { PaginationProps } from '$/core/components/pagination/pagination';
import type { PaginationCursorProps } from '$/core/components/pagination/pagination-cursor';
import type { CursorPaginationStore, PaginationStore } from '$/core/stores/pagination.store';
import { loggerUtils } from '$/core/utils/logger';
import type { Accessor } from 'solid-js';

type BuildHandleCursorPageChangeOptions = {
  paginationStore: CursorPaginationStore;
  refetch: () => Promise<{ previousCursor: string | undefined; nextCursor: string | undefined }>;
  queryString: Accessor<{ cursor?: string }>;
  setQueryString: (queryString: { cursor?: string }) => void;
  onPageChanged?: () => Promise<void>;
};

const buildHandleCursorPageChange = (
  options: BuildHandleCursorPageChangeOptions,
): PaginationCursorProps['onPageChange'] => {
  return async (lastCursor) => {
    const previousLoadedCursor = options.queryString().cursor;

    try {
      options.setQueryString({
        ...options.queryString(),
        cursor: lastCursor,
      });

      options.paginationStore.setIsLoading(true);

      const response = await options.refetch();

      options.paginationStore.setIsLoading(false);

      options.onPageChanged?.();

      return {
        newPreviousCursor: response.previousCursor,
        newNextCursor: response.nextCursor,
      };
    } catch (error: unknown) {
      options.setQueryString({
        ...options.queryString(),
        cursor: previousLoadedCursor,
      });

      // @todo proper error handling
      loggerUtils.log(error);

      return false;
    } finally {
      options.paginationStore.setIsLoading(false);
    }
  };
};

type BuildHandlePageChangeOptions = {
  paginationStore: PaginationStore;
  refetch: () => Promise<{ itemsPerPage: number; totalItems: number }>;
  queryString: Accessor<{ offset?: number | string }>;
  setQueryString: (queryString: { offset?: number | string }) => void;
  onPageChanged?: () => Promise<void>;
};

const buildHandlePageChange = (options: BuildHandlePageChangeOptions): PaginationProps['onPageChange'] => {
  return async (previousPage, newPage, itemsPerPage) => {
    const previousLoadedOffset = options.queryString().offset;

    try {
      options.setQueryString({
        ...options.queryString(),
        offset: (newPage - 1) * itemsPerPage,
      });

      options.paginationStore.setIsLoading(true);

      const response = await options.refetch();

      options.paginationStore.setItemsPerPage(response.itemsPerPage);
      options.paginationStore.setTotalItems(response.totalItems);

      options.paginationStore.setIsLoading(false);

      options.onPageChanged?.();

      return true;
    } catch (error: unknown) {
      options.setQueryString({
        ...options.queryString(),
        offset: (previousPage - 1) * itemsPerPage,
      });

      // @todo proper error handling
      loggerUtils.log(error);

      return false;
    } finally {
      options.paginationStore.setIsLoading(false);
    }
  };
};

export const paginationComponentUtils = {
  buildHandleCursorPageChange,
  buildHandlePageChange,
};
