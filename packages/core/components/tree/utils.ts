import { domUtils } from '$/core/utils/dom';
import { type Accessor, type Setter, createSignal } from 'solid-js';

export type TreeStore = {
  parentElementRef: Accessor<HTMLDivElement | undefined>;
  setParentElementRef: Setter<HTMLDivElement | undefined>;
  scrollToItem: (value: string) => void;
};

const createTreeStore = (): TreeStore => {
  const [parentElementRef, setParentElementRef] = createSignal<HTMLDivElement | undefined>();

  const scrollToItem = (value: string) => {
    const currentParentElement = parentElementRef();

    if (!currentParentElement) {
      return;
    }

    const itemElement = currentParentElement.querySelector(`[data-value="${value}"]`) as HTMLElement;

    if (!itemElement) {
      return;
    }

    domUtils.scrollToElement(itemElement);
  };

  return {
    parentElementRef,
    setParentElementRef,
    scrollToItem,
  };
};

export const treeComponentUtils = {
  createStore: createTreeStore,
};
