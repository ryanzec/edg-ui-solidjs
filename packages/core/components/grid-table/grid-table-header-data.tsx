import Icon, { IconColor, type IconName } from '$/core/components/icon';
import { loggerUtils } from '$/core/utils/logger';
import { tailwindUtils } from '$/core/utils/tailwind';
import { type JSX, Show, mergeProps, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';

export const GridTableSortDirection = {
  NONE: 'none',
  ASC: 'asc',
  DESC: 'desc',
} as const;

export type GridTableSortDirection = (typeof GridTableSortDirection)[keyof typeof GridTableSortDirection];

export type GridTableHeaderDataProps = JSX.HTMLAttributes<HTMLDivElement> & {
  sortKey?: string;
  sortDirection?: GridTableSortDirection;
  onSortChange?: (sortKey: string, newSortDirection: GridTableSortDirection) => void;
};

const GridTableHeaderData = (passedProps: GridTableHeaderDataProps) => {
  const [props, restOfProps] = splitProps(mergeProps({ sortDirection: GridTableSortDirection.NONE }, passedProps), [
    'class',
    'sortDirection',
    'onSortChange',
    'children',
    'sortKey',
  ]);

  const isSortable = () => {
    if (props.onSortChange && !props.sortKey) {
      loggerUtils.error('sortKey is required when onSortChange is provided');

      return false;
    }

    return props.onSortChange && props.sortKey;
  };

  const isSorting = () => {
    return isSortable() && props.sortDirection !== GridTableSortDirection.NONE;
  };

  const handleSortChange = () => {
    if (!props.onSortChange || !props.sortKey) {
      return;
    }

    if (props.sortDirection === GridTableSortDirection.NONE) {
      props.onSortChange(props.sortKey, GridTableSortDirection.ASC);

      return;
    }

    if (props.sortDirection === GridTableSortDirection.ASC) {
      props.onSortChange(props.sortKey, GridTableSortDirection.DESC);

      return;
    }

    props.onSortChange(props.sortKey, GridTableSortDirection.NONE);
  };

  const getSortIcon = (): IconName => {
    if (props.sortDirection === GridTableSortDirection.ASC) {
      return 'arrow-up';
    }

    if (props.sortDirection === GridTableSortDirection.DESC) {
      return 'arrow-down';
    }

    return 'arrows-down-up';
  };

  const elementType = () => {
    if (isSortable()) {
      return 'button';
    }

    return 'div';
  };

  const extraProps = () => {
    if (isSortable()) {
      return {
        onClick: handleSortChange,
        type: 'button',
      };
    }
  };

  return (
    <Dynamic
      component={elementType()}
      // biome-ignore lint/a11y/useSemanticElements: we use div for grid styling compatibility
      role="columnheader"
      class={tailwindUtils.merge(
        'px-lg py-base font-medium uppercase min-w-[1px] flex items-center gap-3xs mb-2xs rounded-sm',
        {
          'cursor-pointer': isSortable(),
          'hover:bg-neutral-subtle': isSortable(),
        },
        props.class,
      )}
      {...restOfProps}
      {...extraProps()}
    >
      {props.children}
      <Show when={isSortable()}>
        <div class="flex flex-col">
          <Icon
            icon={getSortIcon()}
            color={props.sortDirection === GridTableSortDirection.NONE ? IconColor.NEUTRAL : IconColor.INHERIT}
          />
        </div>
      </Show>
    </Dynamic>
  );
};

export default GridTableHeaderData;
