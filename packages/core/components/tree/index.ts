import { default as BaseTree, type TreeProps, TreeSize } from '$/core/components/tree/tree';
import Group, { type TreeGroupProps } from '$/core/components/tree/tree-group';
import Item, { type TreeItemProps } from '$/core/components/tree/tree-item';
import { treeComponentUtils } from '$/core/components/tree/utils';

export type { TreeProps, TreeItemProps, TreeGroupProps };

export const Tree = Object.assign(BaseTree, { Item, Group });
export { TreeSize, treeComponentUtils };

export default Tree;
