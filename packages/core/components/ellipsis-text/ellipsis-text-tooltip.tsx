import type { JSX } from 'solid-js';
import Tooltip, { type TooltipComponentRef } from '$/core/components/tooltip';
import { componentRefUtils } from '$/core/stores/component-ref';
import { tailwindUtils } from '$/core/utils/tailwind';

export type EllipsisTextTooltipProps = {
  text: string;
  tooltipContentElement: JSX.Element;
  tooltipContentClass?: string;
  class?: string;
};

const EllipsisTextTooltip = (props: EllipsisTextTooltipProps) => {
  const tooltipComponentRef = componentRefUtils.createRef<TooltipComponentRef>();

  const isSingleLine = () => props.class?.includes('line-clamp-1');

  return (
    <Tooltip tooltipComponentRef={tooltipComponentRef} placement="bottom" class="w-full" defaultOnlyIfScrollable={true}>
      <Tooltip.Handle
        isStyled={false}
        class={tailwindUtils.merge('text-ellipsis overflow-hidden', props.class, {
          '!inline-block': isSingleLine(),
          'whitespace-nowrap': isSingleLine(),
        })}
      >
        {props.text}
      </Tooltip.Handle>
      <Tooltip.Content class={props.tooltipContentClass}>{props.tooltipContentElement}</Tooltip.Content>
    </Tooltip>
  );
};

export default EllipsisTextTooltip;
