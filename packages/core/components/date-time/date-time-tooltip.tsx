import { createEffect } from 'solid-js';
import DateTime, { type DateTimeProps } from '$/core/components/date-time/date-time';
import Tooltip, { type TooltipComponentRef } from '$/core/components/tooltip';
import { componentRefUtils } from '$/core/stores/component-ref';
import { DateTimeFormat } from '$/core/utils/date';

export type DateTimeTooltipProps = DateTimeProps;

const DateTimeTooltip = (props: DateTimeTooltipProps) => {
  const tooltipComponentRef = componentRefUtils.createRef<TooltipComponentRef>();

  createEffect(function updateTooltipEnabledState() {
    tooltipComponentRef.api()?.setIsEnabled(props.date.isValid);
  });

  return (
    <Tooltip tooltipComponentRef={tooltipComponentRef} placement="bottom">
      <Tooltip.Handle isStyled={false}>
        <DateTime {...props} />
      </Tooltip.Handle>
      <Tooltip.Content>{props.date.toFormat(DateTimeFormat.STANDARD_TIMEZONE)}</Tooltip.Content>
    </Tooltip>
  );
};

export default DateTimeTooltip;
