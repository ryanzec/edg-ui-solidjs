import { type JSX, createContext, mergeProps, splitProps } from 'solid-js';

import type { TreeStore } from '$/core/components/tree/utils';
import type { CommonDataAttributes } from '$/core/types/generic';
import { tailwindUtils } from '$/core/utils/tailwind';

export const TreeSize = {
  DEFAULT: 'default',
  SMALL: 'small',
} as const;

export type TreeSize = (typeof TreeSize)[keyof typeof TreeSize];

type TreeCustomProps = JSX.HTMLAttributes<HTMLDivElement> &
  CommonDataAttributes & {
    size?: TreeSize;
    treeStore: TreeStore;
  };

export const TreeContext = createContext<TreeCustomProps>();

export type TreeProps = JSX.HTMLAttributes<HTMLDivElement> & CommonDataAttributes & TreeCustomProps;

const Tree = (passedProps: TreeProps) => {
  const [props, restOfProps] = splitProps(mergeProps({ size: TreeSize.DEFAULT }, passedProps), [
    'class',
    'size',
    'treeStore',
  ]);

  return (
    <TreeContext.Provider value={props}>
      <div
        ref={props.treeStore.setParentElement}
        data-id="tree"
        {...restOfProps}
        class={tailwindUtils.merge('flex flex-col', props.class)}
      />
    </TreeContext.Provider>
  );
};

export default Tree;
