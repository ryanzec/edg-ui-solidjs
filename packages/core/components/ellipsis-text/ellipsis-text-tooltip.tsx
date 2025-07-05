import Tooltip, { tooltipComponentUtils } from '$/core/components/tooltip';
import { tailwindUtils } from '$/core/utils/tailwind';
import type { JSX } from 'solid-js';

export type EllipsisTextTooltipProps = {
  text: string;
  tooltipContentElement: JSX.Element;
  tooltipContentClass?: string;
  class?: string;
};

const EllipsisTextTooltip = (props: EllipsisTextTooltipProps) => {
  const tooltipStore = tooltipComponentUtils.createStore({
    defaultOnlyIfScrollable: true,
  });

  const isSingleLine = () => props.class?.includes('line-clamp-1');

  return (
    <Tooltip store={tooltipStore} placement="bottom" class="w-full">
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
