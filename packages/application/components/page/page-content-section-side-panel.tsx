import type { CommonDataAttributes } from '$/core/types/generic';
import { tailwindUtils } from '$/core/utils/tailwind';
import { type JSX, splitProps } from 'solid-js';

export type PageContentSectionSidePanelProps = JSX.HTMLAttributes<HTMLDivElement> & CommonDataAttributes;

const PageContentSectionSidePanel = (passedProps: PageContentSectionSidePanelProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['class']);

  return <div class={tailwindUtils.merge('p-base border-outline border-r', props.class)} {...restOfProps} />;
};

export default PageContentSectionSidePanel;
