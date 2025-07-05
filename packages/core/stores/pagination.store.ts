import { type Accessor, createSignal } from 'solid-js';

type CreatePaginationStoreOptions = {
  defaultCurrentPage?: number;
  itemsPerPage?: number;
  totalItems: number;
  surroundingPages?: number;
};

export type PaginationStore = {
  currentPage: Accessor<number>;
  setCurrentPage: (currentPage: number) => void;
  isLoading: Accessor<boolean>;
  setIsLoading: (isLoading: boolean) => void;
  itemsPerPage: Accessor<number>;
  setItemsPerPage: (itemsPerPage: number) => void;
  totalItems: Accessor<number>;
  setTotalItems: (totalItems: number) => void;
  surroundingPages: Accessor<number>;
  setSurroundingPages: (surroundingPages: number) => void;
  totalPages: () => number;
  currentItemOffsets: () => [number, number];
  visiblePageNumbers: () => (number | string)[];
};

const createPaginationStore = (options: CreatePaginationStoreOptions): PaginationStore => {
  const [currentPage, setCurrentPage] = createSignal(options.defaultCurrentPage || 1);
  const [isLoading, setIsLoading] = createSignal(false);
  const [itemsPerPage, setItemsPerPage] = createSignal(options.itemsPerPage || 10);
  const [totalItems, setTotalItems] = createSignal<number>(options.totalItems || 0);
  const [surroundingPages, setSurroundingPages] = createSignal<number>(options.surroundingPages ?? 2);

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

  return {
    currentPage,
    setCurrentPage,
    isLoading,
    setIsLoading,
    itemsPerPage,
    setItemsPerPage,
    totalItems,
    setTotalItems,
    surroundingPages,
    setSurroundingPages,
    totalPages,
    currentItemOffsets,
    visiblePageNumbers,
  };
};

type CreateCursorPaginationStoreOptions = {
  defaultPreviousCursor?: string;
  defaultNextCursor?: string;
  itemsPerPage?: number;
  totalItems?: number;
  surroundingPages?: number;
};

export type CursorPaginationStore = {
  previousCursor: Accessor<string | undefined>;
  setPreviousCursor: (previousCursor: string | undefined) => void;
  nextCursor: Accessor<string | undefined>;
  setNextCursor: (nextCursor: string | undefined) => void;
  isLoading: Accessor<boolean>;
  setIsLoading: (isLoading: boolean) => void;
  itemsPerPage: Accessor<number>;
  setItemsPerPage: (itemsPerPage: number) => void;
  totalItems: Accessor<number>;
  setTotalItems: (totalItems: number) => void;
  totalPages: () => number;
};

const createCursorPaginationStore = (options: CreateCursorPaginationStoreOptions = {}): CursorPaginationStore => {
  const [previousCursor, setPreviousCursor] = createSignal(options.defaultPreviousCursor || '');
  const [nextCursor, setNextCursor] = createSignal(options.defaultNextCursor || '');
  const [isLoading, setIsLoading] = createSignal(false);
  const [itemsPerPage, setItemsPerPage] = createSignal(options.itemsPerPage || 10);
  const [totalItems, setTotalItems] = createSignal<number>(options.totalItems || 0);

  const totalPages = () => {
    return Math.ceil(totalItems() / itemsPerPage());
  };

  return {
    previousCursor,
    setPreviousCursor,
    nextCursor,
    setNextCursor,
    isLoading,
    setIsLoading,
    itemsPerPage,
    setItemsPerPage,
    totalItems,
    setTotalItems,
    totalPages,
  };
};

export const paginationStoreUtils = {
  createStore: createPaginationStore,
  createCursorStore: createCursorPaginationStore,
};
