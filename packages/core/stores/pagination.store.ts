import { type Accessor, createEffect, createSignal } from 'solid-js';

type ManagedData = {
  offset?: number | string;
  limit?: number | string;
  [key: string]: unknown;
};

type CreatePaginationStoreOptions<TManagedData extends ManagedData> = {
  defaultCurrentPage?: number;
  itemsPerPage?: number;
  totalItems?: number;
  surroundingPages?: number;
  managedData: Accessor<TManagedData>;
  setManagedData: (managedData: TManagedData) => void;
  getAsyncUpdate: () => {
    isFetching: boolean;
    isError: boolean;
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
  };
  onPageChanged?: (previousPage: number, newPage: number) => void;
};

export type PaginationStore = {
  currentPage: Accessor<number>;
  setCurrentPage: (currentPage: number) => void;
  isLoading: Accessor<boolean>;
  setIsLoading: (isLoading: boolean) => void;
  lastLoadFailed: Accessor<boolean>;
  setLastLoadFailed: (lastLoadFailed: boolean) => void;
  itemsPerPage: Accessor<number>;
  setItemsPerPage: (itemsPerPage: number) => void;
  totalItems: Accessor<number>;
  setTotalItems: (totalItems: number) => void;
  surroundingPages: Accessor<number>;
  setSurroundingPages: (surroundingPages: number) => void;
  totalPages: () => number;
  currentItemOffsets: () => [number, number];
  visiblePageNumbers: () => (number | string)[];
  handlePageChange: (previousPage: number, newPage: number, itemsPerPage: number) => void;
  handlePageSizeChange: (newPageSize: number) => void;
};

const createPaginationStore = <TManagedData extends ManagedData = ManagedData>(
  options: CreatePaginationStoreOptions<TManagedData>,
): PaginationStore => {
  const [currentPage, internalSetCurrentPage] = createSignal(options.defaultCurrentPage || 1);
  const [isLoading, setIsLoading] = createSignal(false);
  const [lastLoadFailed, setLastLoadFailed] = createSignal(false);
  const [itemsPerPage, setItemsPerPage] = createSignal(options.itemsPerPage || 10);
  const [totalItems, setTotalItems] = createSignal<number>(options.totalItems || 0);
  const [surroundingPages, setSurroundingPages] = createSignal<number>(options.surroundingPages ?? 2);

  const setCurrentPage = (newPage: number) => {
    const previousPage = currentPage();

    internalSetCurrentPage(newPage);

    if (previousPage === newPage) {
      return;
    }

    options.onPageChanged?.(previousPage, newPage);
  };

  const totalPages = () => {
    return Math.ceil(totalItems() / itemsPerPage());
  };

  const currentItemOffsets = (): [number, number] => {
    const offset = (currentPage() - 1) * itemsPerPage();
    const endOffset = Math.min(offset + itemsPerPage(), totalItems());

    return [offset, endOffset];
  };

  const visiblePageNumbers = () => {
    if (totalPages() <= 1) {
      return [1];
    }

    const pageNumbers: (number | string)[] = [];

    pageNumbers.push(1);

    if (currentPage() - surroundingPages() > 2) {
      pageNumbers.push('...');
    }

    const startIndex = Math.max(2, currentPage() - surroundingPages());
    const endIndex = Math.min(totalPages() - 1, currentPage() + surroundingPages());

    for (let i = startIndex; i <= endIndex; i++) {
      pageNumbers.push(i);
    }

    if (currentPage() + surroundingPages() < totalPages() - 1) {
      pageNumbers.push('...');
    }

    if (totalPages() > 1) {
      pageNumbers.push(totalPages());
    }

    return pageNumbers;
  };

  const handlePageChange = (previousPage: number, newPage: number, itemsPerPage: number) => {
    options.setManagedData({
      ...options.managedData(),
      offset: (newPage - 1) * itemsPerPage,
      limit: itemsPerPage,
    });

    setItemsPerPage(itemsPerPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    options.setManagedData({
      ...options.managedData(),
      offset: 0,
      limit: newPageSize,
    });

    setCurrentPage(1);
    setItemsPerPage(newPageSize);
  };

  createEffect(function asyncDataUpdated() {
    const currentAsyncData = options.getAsyncUpdate();

    setIsLoading(currentAsyncData.isFetching);

    if (currentAsyncData.isFetching) {
      setLastLoadFailed(false);

      return;
    }

    setLastLoadFailed(currentAsyncData.isError);
    setTotalItems(currentAsyncData.totalItems);
    setCurrentPage(currentAsyncData.currentPage);
    setItemsPerPage(currentAsyncData.itemsPerPage);
  });

  return {
    currentPage,
    setCurrentPage,
    isLoading,
    setIsLoading,
    lastLoadFailed,
    setLastLoadFailed,
    itemsPerPage,
    setItemsPerPage,
    totalItems,
    setTotalItems,
    surroundingPages,
    setSurroundingPages,
    totalPages,
    currentItemOffsets,
    visiblePageNumbers,
    handlePageChange,
    handlePageSizeChange,
  };
};

export const paginationStoreUtils = {
  createStore: createPaginationStore,
};
