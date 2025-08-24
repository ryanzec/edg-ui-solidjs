import { type JSX, mergeProps, splitProps } from 'solid-js';
import type { CommonDataAttributes } from '$/core/types/generic';
import { tailwindUtils } from '$/core/utils/tailwind';

export type PageContentProps = JSX.HTMLAttributes<HTMLDivElement> & CommonDataAttributes;

const PageContent = (passedProps: PageContentProps) => {
  const [props, restOfProps] = splitProps(mergeProps({}, passedProps), ['class']);

  return (
    <div
      data-id="content"
      class={tailwindUtils.merge('flex flex-col gap-sm flex-1 min-h-[0]', props.class)}
      {...restOfProps}
    />
  );
};

export default PageContent;
