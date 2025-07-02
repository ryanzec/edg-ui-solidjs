import { type JSX, createContext, mergeProps, splitProps } from 'solid-js';

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
  };

export const TreeContext = createContext<TreeCustomProps>();

export type TreeProps = JSX.HTMLAttributes<HTMLDivElement> & CommonDataAttributes & TreeCustomProps;

const Tree = (passedProps: TreeProps) => {
  const [props, restOfProps] = splitProps(mergeProps({ size: TreeSize.DEFAULT }, passedProps), ['class', 'size']);

  return (
    <TreeContext.Provider value={props}>
      <div data-id="tree" {...restOfProps} class={tailwindUtils.merge('flex flex-col', props.class)} />
    </TreeContext.Provider>
  );
};

export default Tree;
