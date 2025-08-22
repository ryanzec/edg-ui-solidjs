import { type Accessor, createSignal } from 'solid-js';

export const SortDirection = {
  NONE: 'none',
  ASC: 'asc',
  DESC: 'desc',
} as const;

export type SortDirection = (typeof SortDirection)[keyof typeof SortDirection];

type ManagedData = {
  sortKey?: string;
  sortDirection?: SortDirection;
  offset?: number | string;
  [key: string]: unknown;
};

export type SortingStore = {
  sortKey: () => string | undefined;
  sortDirection: () => SortDirection | undefined;
  onSortChange: (sortKey: string, sortDirection: SortDirection) => void;
};

export type CreateSortingStoreOptions = {
  managedData: Accessor<ManagedData>;
  setManagedData: (managedData: ManagedData) => void;
  onSortChange?: (sortKey: string, sortDirection: SortDirection) => void;
};

export const createSortingStore = (options: CreateSortingStoreOptions): SortingStore => {
  const onSortChange = (newSortKey: string, newSortDirection: SortDirection) => {
    const newManagedData = {
      ...options.managedData(),
      sortKey: newSortKey,
      sortDirection: newSortDirection,
    };

    if (newManagedData.offset !== undefined) {
      newManagedData.offset = 0;
    }

    options.setManagedData(newManagedData);

    options.onSortChange?.(newSortKey, newSortDirection);
  };

  return {
    sortKey: () => options.managedData().sortKey,
    sortDirection: () => options.managedData().sortDirection,
    onSortChange,
  };
};

export const sortingStoreUtils = {
  createStore: createSortingStore,
};
