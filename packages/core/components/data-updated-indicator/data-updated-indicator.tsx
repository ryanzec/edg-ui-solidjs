import { mergeProps, splitProps } from 'solid-js';
import { DateTime, type DateTimeProps } from '$/core/components/date-time';
import Icon, { IconColor, IconVariant } from '$/core/components/icon';
import { DateFormat, dateUtils, TimeFormat } from '$/core/utils/date';
import { tailwindUtils } from '$/core/utils/tailwind';

export type DataUpdatedIndicatorProps = Omit<DateTimeProps, 'date'> & {
  lastUpdatedAt: string;
  isRefreshing?: boolean;
  isLive?: boolean;
};

const DateUpdatedIndicator = (passedProps: DataUpdatedIndicatorProps) => {
  const [props, restOfProps] = splitProps(
    mergeProps(
      {
        isRefreshing: false,
        isLive: false,
      },
      passedProps,
    ),
    ['lastUpdatedAt', 'isRefreshing', 'isLive'],
  );

  return (
    <div class="flex items-center gap-3xs">
      <Icon
        icon={props.isRefreshing ? 'spinner' : 'circle'}
        variant={props.isRefreshing ? IconVariant.REGULAR : IconVariant.FILL}
        color={props.isLive ? IconColor.SUCCESS : IconColor.NEUTRAL}
        class={tailwindUtils.merge({
          'animate-spin': props.isRefreshing,
        })}
      />{' '}
      Last Updated:&nbsp;
      <DateTime
        {...restOfProps}
        date={dateUtils.getDateWithConfiguredTimezone(props.lastUpdatedAt)}
        dateFormat={DateFormat.STANDARD}
        timeFormat={TimeFormat.STANDARD}
      />
    </div>
  );
};

export default DateUpdatedIndicator;
