import { type JSX, createContext, createSignal, onCleanup, splitProps } from 'solid-js';

import type { TreeComponentRef, TreeItemData } from '$/core/components/tree/utils';
import type { ComponentRef } from '$/core/stores/component-ref';
import type { CommonDataAttributes } from '$/core/types/generic';
import { domUtils } from '$/core/utils/dom';
import { tailwindUtils } from '$/core/utils/tailwind';

export const TreeSize = {
  DEFAULT: 'default',
  SMALL: 'small',
} as const;

export type TreeSize = (typeof TreeSize)[keyof typeof TreeSize];

export const TreeContext = createContext<TreeComponentRef>();

export type TreeProps = JSX.HTMLAttributes<HTMLDivElement> &
  CommonDataAttributes & {
    treeComponentRef: ComponentRef<TreeComponentRef>;
    initialSize?: TreeSize;
  };

const Tree = (passedProps: TreeProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['class', 'treeComponentRef', 'initialSize']);

  const [parentElementRef, setParentElementRef] = createSignal<HTMLDivElement | undefined>();
  const [activeItem, setActiveItem] = createSignal<TreeItemData>();
  const [size, setSize] = createSignal(props.initialSize ?? TreeSize.DEFAULT);

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

  const treeComponentRef: TreeComponentRef = {
    scrollToItem,
    activeItem,
    setActiveItem,
    size,
    setSize,
  };

  props.treeComponentRef?.onReady(treeComponentRef);

  onCleanup(() => {
    props.treeComponentRef?.onCleanup();
  });

  return (
    <TreeContext.Provider value={treeComponentRef}>
      <div
        ref={setParentElementRef}
        data-id="tree"
        {...restOfProps}
        class={tailwindUtils.merge('flex flex-col', props.class)}
      />
    </TreeContext.Provider>
  );
};

export default Tree;
