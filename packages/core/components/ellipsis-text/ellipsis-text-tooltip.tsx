import Tooltip, { tooltipComponentUtils } from '$/core/components/tooltip';
import classnames from 'classnames';
import type { JSX } from 'solid-js';

export type EllipsisTextTooltipProps = {
  text: string;
  tooltipContent: JSX.Element;
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
        class={classnames('text-ellipsis overflow-hidden', props.class, {
          '!inline-block': isSingleLine(),
          'whitespace-nowrap': isSingleLine(),
        })}
      >
        {props.text}
      </Tooltip.Handle>
      <Tooltip.Content class={props.tooltipContentClass}>{props.tooltipContent}</Tooltip.Content>
    </Tooltip>
  );
};

export default EllipsisTextTooltip;
