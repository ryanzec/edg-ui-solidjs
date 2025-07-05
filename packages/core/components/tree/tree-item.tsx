import { type JSX, splitProps } from 'solid-js';

import type { IconName } from '$/core/components/icon';
import TreeLabel from '$/core/components/tree/tree-label';
import type { CommonDataAttributes } from '$/core/types/generic';
import { tailwindUtils } from '$/core/utils/tailwind';

export type TreeItemProps<TItem> = JSX.HTMLAttributes<HTMLDivElement> &
  CommonDataAttributes & {
    item: TItem;
    label: string;
    onClick?: (event: MouseEvent) => void;
    onSelectItem?: (item: TItem) => void;
    icon?: IconName;
    isActive?: boolean;
    'data-value'?: string;
  };

const TreeItem = <TItem,>(passedProps: TreeItemProps<TItem>) => {
  const [props, restOfProps] = splitProps(passedProps, [
    'class',
    'label',
    'onSelectItem',
    'item',
    'icon',
    'onClick',
    'isActive',
    'data-value',
  ]);

  const handleItemSelect = (event: MouseEvent) => {
    event.stopPropagation();
    props.onSelectItem?.(props.item);
  };

  const handleClick = (event: MouseEvent) => {
    event.stopPropagation();
    props.onClick?.(event);
  };

  return (
    <div data-id="tree-item" data-value={props['data-value']} {...restOfProps} class="flex flex-col">
      <button
        class={tailwindUtils.merge(
          'cursor-pointer hover:bg-surface-tertiary',
          {
            'bg-brand-subtle3': props.isActive,
          },
          props.class,
        )}
        type="button"
        onClick={handleClick}
        onDblClick={handleItemSelect}
      >
        <TreeLabel label={props.label} icon={props.icon || 'floppy-disk'} />
      </button>
    </div>
  );
};

export default TreeItem;
