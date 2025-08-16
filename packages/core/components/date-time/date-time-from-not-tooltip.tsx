import DateTimeFromNow, { type DateTimeFromNowProps } from '$/core/components/date-time/date-time-from-now';
import Tooltip, { type TooltipComponentRef } from '$/core/components/tooltip';
import { componentRefUtils } from '$/core/stores/component-ref';
import { DateTimeFormat } from '$/core/utils/date';

export type DateTimeFromNowTooltipProps = DateTimeFromNowProps;

const DateTimeFromNowTooltip = (props: DateTimeFromNowTooltipProps) => {
  const tooltipComponentRef = componentRefUtils.createRef<TooltipComponentRef>();

  return (
    <Tooltip tooltipComponentRef={tooltipComponentRef} placement="bottom">
      <Tooltip.Handle isStyled={false}>
        <DateTimeFromNow {...props} />
      </Tooltip.Handle>
      <Tooltip.Content>{props.date.toFormat(DateTimeFormat.STANDARD_DATE_TIME_TIMEZONE)}</Tooltip.Content>
    </Tooltip>
  );
};

export default DateTimeFromNowTooltip;
