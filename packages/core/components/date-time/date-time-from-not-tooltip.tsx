import Tooltip, { type TooltipComponentRef } from '$/core/components/tooltip';
import { componentRefUtils } from '$/core/stores/component-ref';
import { DateTimeFormat } from '$/core/utils/date';
import DateTimeFromNow, { type DateTimeFromNowProps } from './date-time-from-now';

export type DateTimeFromNowTooltipProps = DateTimeFromNowProps;

const DateTimeFromNowTooltip = (props: DateTimeFromNowTooltipProps) => {
  const tooltipComponentRef = componentRefUtils.createRef<TooltipComponentRef>();

  return (
    <Tooltip tooltipComponentRef={tooltipComponentRef} placement="bottom">
      <Tooltip.Handle isStyled={false}>
        <DateTimeFromNow {...props} />
      </Tooltip.Handle>
      <Tooltip.Content>{props.date.tz('UTC').format(DateTimeFormat.STANDARD_DATE_TIME_TIMEZONE)}</Tooltip.Content>
    </Tooltip>
  );
};

export default DateTimeFromNowTooltip;
