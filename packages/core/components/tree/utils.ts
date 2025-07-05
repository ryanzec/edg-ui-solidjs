import { domUtils } from '$/core/utils/dom';
import { type Accessor, type Setter, createSignal } from 'solid-js';

export type TreeStore = {
  parentElement: Accessor<HTMLDivElement | undefined>;
  setParentElement: Setter<HTMLDivElement | undefined>;
  scrollToItem: (value: string) => void;
};

const createTreeStore = (): TreeStore => {
  const [parentElement, setParentElement] = createSignal<HTMLDivElement | undefined>();

  const scrollToItem = (value: string) => {
    const currentParentElement = parentElement();

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
    parentElement,
    setParentElement,
    scrollToItem,
  };
};

export const treeComponentUtils = {
  createStore: createTreeStore,
};
