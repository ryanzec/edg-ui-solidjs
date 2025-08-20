import { type JSX, splitProps, useContext } from 'solid-js';

import type { IconName } from '$/core/components/icon';
import { TreeContext } from '$/core/components/tree/tree';
import TreeLabel from '$/core/components/tree/tree-label';
import type { TreeItemData } from '$/core/components/tree/utils';
import type { CommonDataAttributes } from '$/core/types/generic';
import { tailwindUtils } from '$/core/utils/tailwind';

export type TreeItemProps<TItem extends TreeItemData> = JSX.HTMLAttributes<HTMLDivElement> &
  CommonDataAttributes & {
    item: TItem;
    label: string;
    onClick?: (event: MouseEvent) => void;
    onSelectItem?: (item: TItem) => void;
    icon?: IconName;
    'data-value'?: string;
  };

const TreeItem = <TItem extends TreeItemData>(passedProps: TreeItemProps<TItem>) => {
  const [props, restOfProps] = splitProps(passedProps, [
    'class',
    'label',
    'onSelectItem',
    'item',
    'icon',
    'onClick',
    'data-value',
  ]);

  const treeContext = useContext(TreeContext);

  const isActive = () => treeContext?.activeItem() === props.item;

  const handleItemSelect = (event: MouseEvent) => {
    event.stopPropagation();
    treeContext?.setActiveItem(props.item);
    props.onSelectItem?.(props.item);
  };

  const handleClick = (event: MouseEvent) => {
    event.stopPropagation();
    treeContext?.setActiveItem(props.item);
    props.onClick?.(event);
  };

  return (
    <div data-id="item" data-value={props['data-value']} {...restOfProps} class="flex flex-col">
      <button
        class={tailwindUtils.merge(
          'cursor-pointer hover:bg-surface-tertiary',
          {
            'bg-brand-weak': isActive(),
          },
          props.class,
        )}
        type="button"
        onClick={handleClick}
        onDblClick={handleItemSelect}
      >
        <TreeLabel label={props.label} icon={props.icon || 'floppy-disk'} isActive={isActive()} />
      </button>
    </div>
  );
};

export default TreeItem;
