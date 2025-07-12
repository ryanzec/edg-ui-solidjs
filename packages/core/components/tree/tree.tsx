import { type JSX, createContext, splitProps } from 'solid-js';

import type { TreeStore } from '$/core/components/tree/utils';
import type { CommonDataAttributes } from '$/core/types/generic';
import { tailwindUtils } from '$/core/utils/tailwind';

export const TreeSize = {
  DEFAULT: 'default',
  SMALL: 'small',
} as const;

export type TreeSize = (typeof TreeSize)[keyof typeof TreeSize];

export const TreeContext = createContext<TreeStore>();

export type TreeProps = JSX.HTMLAttributes<HTMLDivElement> &
  CommonDataAttributes & {
    treeStore: TreeStore;
  };

const Tree = (passedProps: TreeProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['class', 'treeStore']);

  return (
    <TreeContext.Provider value={props.treeStore}>
      <div
        ref={props.treeStore.setParentElementRef}
        data-id="tree"
        {...restOfProps}
        class={tailwindUtils.merge('flex flex-col', props.class)}
      />
    </TreeContext.Provider>
  );
};

export default Tree;
