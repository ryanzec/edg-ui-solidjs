import { type JSX, splitProps } from 'solid-js';

import ScrollArea from '$/core/components/scroll-area';
import type { CommonDataAttributes } from '$/core/types/generic';
import { tailwindUtils } from '$/core/utils/tailwind';

export type PeekContentProps = JSX.HTMLAttributes<HTMLDivElement> & CommonDataAttributes;

const PeekContent = (passedProps: PeekContentProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['children', 'class']);

  return (
    <div
      data-id="content"
      {...restOfProps}
      class={tailwindUtils.merge('flex-1 min-h-1 overflow-hidden h-full', props.class)}
    >
      <ScrollArea>
        <div class="p-base">{props.children}</div>
      </ScrollArea>
    </div>
  );
};

export default PeekContent;
