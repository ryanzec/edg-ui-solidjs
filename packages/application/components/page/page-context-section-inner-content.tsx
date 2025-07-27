import { type JSX, splitProps } from 'solid-js';
import type { CommonDataAttributes } from '$/core/types/generic';
import { tailwindUtils } from '$/core/utils/tailwind';

export type PageContentSectionInnerContentProps = JSX.HTMLAttributes<HTMLDivElement> & CommonDataAttributes;

const PageContentSectionInnerContent = (passedProps: PageContentSectionInnerContentProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['class']);

  return <div class={tailwindUtils.merge('p-base flex-1', props.class)} {...restOfProps} />;
};

export default PageContentSectionInnerContent;
