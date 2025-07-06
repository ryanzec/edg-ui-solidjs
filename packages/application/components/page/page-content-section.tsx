import type { CommonDataAttributes } from '$/core/types/generic';
import { tailwindUtils } from '$/core/utils/tailwind';
import { type JSX, mergeProps, splitProps } from 'solid-js';

export type PageContentSectionProps = JSX.HTMLAttributes<HTMLDivElement> &
  CommonDataAttributes & {
    hasPadding?: boolean;
    hasSidePanel?: boolean;
    expandFull?: boolean;
  };

const PageContentSection = (passedProps: PageContentSectionProps) => {
  const [props, restOfProps] = splitProps(
    mergeProps({ hasPadding: true, hasSidePanel: false, expandFull: false }, passedProps),
    ['class', 'hasPadding', 'hasSidePanel', 'expandFull'],
  );

  return (
    <div
      class={tailwindUtils.merge(
        'border-outline border bg-surface rounded-sm',
        {
          'p-base': props.hasPadding,
          'flex flex-row': props.hasSidePanel,
          'flex-1': props.expandFull,
        },
        props.class,
      )}
      {...restOfProps}
    />
  );
};

export default PageContentSection;
