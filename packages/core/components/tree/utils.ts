import { TreeSize } from '$/core/components/tree/tree';
import { domUtils } from '$/core/utils/dom';
import { type Accessor, type Setter, createSignal } from 'solid-js';

export type TreeItemData = {
  id: string;
  [key: string]: unknown;
};

export type TreeStore = {
  parentElementRef: Accessor<HTMLDivElement | undefined>;
  setParentElementRef: Setter<HTMLDivElement | undefined>;
  scrollToItem: (value: string) => void;
  activeItem: Accessor<TreeItemData | undefined>;
  setActiveItem: Setter<TreeItemData | undefined>;
  size: Accessor<TreeSize>;
  setSize: Setter<TreeSize>;
};

export type CreateTreeStoreOptions = {
  initialSize?: TreeSize;
};

const createTreeStore = (options: CreateTreeStoreOptions = {}): TreeStore => {
  const [parentElementRef, setParentElementRef] = createSignal<HTMLDivElement | undefined>();
  const [activeItem, setActiveItem] = createSignal<TreeItemData>();
  const [size, setSize] = createSignal(options.initialSize ?? TreeSize.DEFAULT);

  const scrollToItem = (value: string) => {
    const currentParentElement = parentElementRef();

    if (!currentParentElement) {
      return;
    }

    const itemElement = currentParentElement.querySelector(`[data-value="${value}"]`) as HTMLElement;

    if (!itemElement) {
      return;
    }

    setActiveItem(activeItem());

    domUtils.scrollToElement(itemElement);
  };

  return {
    parentElementRef,
    setParentElementRef,
    scrollToItem,
    activeItem,
    setActiveItem,
    size,
    setSize,
  };
};

export const treeComponentUtils = {
  createStore: createTreeStore,
};
