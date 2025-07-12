import { default as BaseTree, type TreeProps, TreeSize } from '$/core/components/tree/tree';
import Group, { type TreeGroupProps } from '$/core/components/tree/tree-group';
import Item, { type TreeItemProps } from '$/core/components/tree/tree-item';
import type { TreeComponentRef, TreeItemData } from '$/core/components/tree/utils';

export type { TreeProps, TreeItemProps, TreeGroupProps, TreeComponentRef, TreeItemData };

export const Tree = Object.assign(BaseTree, { Item, Group });
export { TreeSize };

export default Tree;
