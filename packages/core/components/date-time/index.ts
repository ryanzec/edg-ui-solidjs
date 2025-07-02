import { default as BaseDateTime, type DateTimeProps } from '$/core/components/date-time/date-time';
import FromNow, { type DateTimeFromNowProps } from '$/core/components/date-time/date-time-from-now';
import Tooltip, { type DateTimeTooltipProps } from '$/core/components/date-time/date-time-tooltip';

export type { DateTimeProps, DateTimeFromNowProps, DateTimeTooltipProps };

export const DateTime = Object.assign(BaseDateTime, { FromNow, Tooltip });

export default DateTime;
