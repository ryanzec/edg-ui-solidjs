import List, { type ListProps } from '$/core/components/list/list';
import Item, { type ListItemProps } from '$/core/components/list/list-item';

export type { ListItemProps, ListProps };

export default Object.assign(List, { Item });
