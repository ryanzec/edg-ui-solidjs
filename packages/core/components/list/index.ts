import { default as BaseList, type ListProps } from '$/core/components/list/list';
import Item, { type ListItemProps } from '$/core/components/list/list-item';

export type { ListProps, ListItemProps };

export const List = Object.assign(BaseList, { Item });

export default List;
