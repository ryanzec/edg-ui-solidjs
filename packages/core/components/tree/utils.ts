import type { TreeSize } from '$/core/components/tree/tree';
import type { Accessor } from 'solid-js';

export type TreeItemData = {
  id: string;
  [key: string]: unknown;
};

export type TreeComponentRef = {
  scrollToItem: (value: string) => void;
  activeItem: Accessor<TreeItemData | undefined>;
  setActiveItem: (item: TreeItemData | undefined) => void;
  clearActiveItem: () => void;
  size: Accessor<TreeSize>;
  setSize: (size: TreeSize) => void;
};
