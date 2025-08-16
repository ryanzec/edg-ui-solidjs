import { default as BaseDateTime, type DateTimeProps } from '$/core/components/date-time/date-time';
import FromNowTooltip, {
  type DateTimeFromNowTooltipProps,
} from '$/core/components/date-time/date-time-from-not-tooltip';
import FromNow, { type DateTimeFromNowProps } from '$/core/components/date-time/date-time-from-now';
import Tooltip, { type DateTimeTooltipProps } from '$/core/components/date-time/date-time-tooltip';

export type { DateTimeProps, DateTimeFromNowProps, DateTimeTooltipProps, DateTimeFromNowTooltipProps };

export const DateTime = Object.assign(BaseDateTime, { FromNow, Tooltip, FromNowTooltip });

export default DateTime;
