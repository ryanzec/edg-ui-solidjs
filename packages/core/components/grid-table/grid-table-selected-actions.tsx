import { type JSX, Show, splitProps } from 'solid-js';
import Checkbox from '$/core/components/checkbox';
import Icon from '$/core/components/icon';
import { tailwindUtils } from '$/core/utils/tailwind';
import GridTableData, { GridTableDataProps } from './grid-table-data';

export type GridTableSelectedActionsProps<TData> = JSX.HTMLAttributes<HTMLDivElement> & {
  selectedItems: TData[];
};

const GridTableSelectedActions = <TData,>(passedProps: GridTableSelectedActionsProps<TData>) => {
  const [props, restOfProps] = splitProps(passedProps, ['children', 'class', 'selectedItems']);

  return (
    <Show when={props.selectedItems.length > 0} fallback={<div>Selected items to perform batch actions</div>}>
      <div {...restOfProps} class={tailwindUtils.merge('flex items-center gap-2xs', props.class)}>
        Selected Count: {props.selectedItems.length}
        {props.children}
      </div>
    </Show>
  );
};

export default GridTableSelectedActions;
