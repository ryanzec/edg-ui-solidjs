import { tailwindUtils } from '$/core/utils/tailwind';
import { type JSX, mergeProps, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';

export type GridTableDataProps = JSX.HTMLAttributes<HTMLDivElement> & {
  isStartOfRow?: boolean;
  isEndOfRow?: boolean;
  isLastRow?: boolean;
  isExpanded?: boolean;
  linkUrl?: string;
  onClick?: (event: MouseEvent) => void;
};

const GridTableData = (passedProps: GridTableDataProps) => {
  const [props, rest] = splitProps(
    mergeProps({ isStartOfRow: false, isEndOfRow: false, isLastRow: false, isExpanded: false }, passedProps),
    ['class', 'isStartOfRow', 'isEndOfRow', 'isLastRow', 'isExpanded', 'linkUrl', 'onClick'],
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
        'px-lg py-base bg-surface-secondary inline-flex items-center min-w-[1px]',
        {
          'rounded-tl-base': props.isExpanded && props.isStartOfRow,
          'rounded-l-base': props.isExpanded === false && props.isStartOfRow,
          'rounded-tr-base': props.isExpanded && props.isEndOfRow,
          'rounded-r-base': props.isExpanded === false && props.isEndOfRow,
          'cursor-pointer': props.onClick,
          'mb-2xs': props.isLastRow === false,
        },
        props.class,
      )}
      {...getMainComponentProps()}
      {...rest}
    />
  );
};

export default GridTableData;
