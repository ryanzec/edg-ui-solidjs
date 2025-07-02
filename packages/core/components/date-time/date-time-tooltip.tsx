import DateTime, { type DateTimeProps } from '$/core/components/date-time/date-time';
import Tooltip, { tooltipComponentUtils } from '$/core/components/tooltip';
import { DateTimeFormat } from '$/core/utils/date';

export type DateTimeTooltipProps = DateTimeProps;

const DateTimeTooltip = (props: DateTimeTooltipProps) => {
  const tooltipStore = tooltipComponentUtils.createStore();

  return (
    <Tooltip store={tooltipStore} placement="bottom">
      <Tooltip.Handle isStyled={false}>
        <DateTime {...props} />
      </Tooltip.Handle>
      <Tooltip.Content>{props.date.tz('UTC').format(DateTimeFormat.STANDARD_DATE_TIME_TIMEZONE)}</Tooltip.Content>
    </Tooltip>
  );
};

export default DateTimeTooltip;
