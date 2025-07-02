import { default as BaseTree, type TreeProps, TreeSize } from '$/core/components/tree/tree';
import Group, { type TreeGroupProps } from '$/core/components/tree/tree-group';
import Item, { type TreeItemProps } from '$/core/components/tree/tree-item';

export type { TreeProps, TreeItemProps, TreeGroupProps };

export { TreeSize };

export const Tree = Object.assign(BaseTree, { Item, Group });

export default Tree;
