import { tailwindUtils } from '$/core/utils/tailwind';
import { type JSX, mergeProps, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';

export type GridTableDataProps = JSX.HTMLAttributes<HTMLDivElement> & {
  isStartOfRow?: boolean;
  isEndOfRow?: boolean;
  isFirstRow?: boolean;
  isLastRow?: boolean;
  isExpanded?: boolean;
  linkUrl?: string;
  onClick?: (event: MouseEvent) => void;
};

const GridTableData = (passedProps: GridTableDataProps) => {
  const [props, rest] = splitProps(
    mergeProps(
      { isStartOfRow: false, isEndOfRow: false, isFirstRow: false, isLastRow: false, isExpanded: false },
      passedProps,
    ),
    ['class', 'isStartOfRow', 'isEndOfRow', 'isFirstRow', 'isLastRow', 'isExpanded', 'linkUrl', 'onClick'],
  );

  const getMainComponentName = () => {
    if (props.onClick) {
      return 'button';
    }

    return props.linkUrl ? 'a' : 'div';
  };

  const getMainComponentProps = () => {
    if (props.onClick) {
      return {
        onClick: props.onClick,
      };
    }

    return props.linkUrl ? { href: props.linkUrl } : {};
  };

  return (
    <Dynamic
      role="cell"
      component={getMainComponentName()}
      class={tailwindUtils.merge(
        'px-grid-table-x py-grid-table-y inline-flex items-center min-w-[1px] border-t border-outline',
        {
          'border-l': props.isStartOfRow,
          'border-r': props.isEndOfRow,
          // 'rounded-tl-sm': props.isFirstRow && props.isStartOfRow,
          // 'rounded-tr-sm': props.isFirstRow && props.isEndOfRow,
          'rounded-bl-sm': props.isLastRow && props.isStartOfRow,
          'rounded-br-sm': props.isLastRow && props.isEndOfRow,
          'cursor-pointer': props.onClick,
          'border-b': props.isLastRow && !props.isExpanded,
        },
        props.class,
      )}
      {...getMainComponentProps()}
      {...rest}
    />
  );
};

export default GridTableData;
