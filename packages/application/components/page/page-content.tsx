import type { CommonDataAttributes } from '$/core/types/generic';
import { tailwindUtils } from '$/core/utils/tailwind';
import { type JSX, mergeProps, splitProps } from 'solid-js';

export type PageContentProps = JSX.HTMLAttributes<HTMLDivElement> & CommonDataAttributes;

const PageContent = (passedProps: PageContentProps) => {
  const [props, restOfProps] = splitProps(mergeProps({}, passedProps), ['class']);

  return <div data-id="content" class={tailwindUtils.merge('flex flex-col flex-1', props.class)} {...restOfProps} />;
};

export default PageContent;
