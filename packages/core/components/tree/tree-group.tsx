import { type JSX, Show, mergeProps, splitProps } from 'solid-js';

import type { IconName } from '$/core/components/icon';
import TreeLabel from '$/core/components/tree/tree-label';
import { toggleStoreUtils } from '$/core/stores/toggle.store';
import type { CommonDataAttributes } from '$/core/types/generic';
import { tailwindUtils } from '$/core/utils/tailwind';

export type TreeGroupProps<TItem> = JSX.HTMLAttributes<HTMLDivElement> &
  CommonDataAttributes & {
    label: string;
    defaultIsExpanded?: boolean;
    onSelectGroup?: (isExpanded: boolean, item?: TItem) => void;
    item?: TItem;
    children?: JSX.Element;
  };

const TreeGroup = <TItem,>(passedProps: TreeGroupProps<TItem>) => {
  const [props, restOfProps] = splitProps(mergeProps({ isFolder: false, defaultIsExpanded: false }, passedProps), [
    'class',
    'label',
    'defaultIsExpanded',
    'onSelectGroup',
    'item',
    'children',
  ]);

  const toggleStore = toggleStoreUtils.createStore({
    defaultIsToggled: props.defaultIsExpanded,
  });

  const handleFolderSelect = (event: MouseEvent) => {
    event.stopPropagation();
    toggleStore.toggle();
    props.onSelectGroup?.(toggleStore.isToggled(), props.item);
  };

  const getIcon = (): IconName => {
    return toggleStore.isToggled() ? 'caret-down' : 'caret-right';
  };

  return (
    <div data-id="tree-group" {...restOfProps} class={tailwindUtils.merge('flex flex-col ', props.class)}>
      <button class="cursor-pointer" type="button" onClick={handleFolderSelect}>
        <TreeLabel label={props.label} icon={getIcon()} />
        <Show when={toggleStore.isToggled()}>
          <div class="ml-4 border-l border-outline pl-2xs">{props.children}</div>
        </Show>
      </button>
    </div>
  );
};

export default TreeGroup;
