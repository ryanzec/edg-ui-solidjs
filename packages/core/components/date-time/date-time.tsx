import type { Dayjs } from 'dayjs';
import { type JSX, mergeProps, Show, splitProps } from 'solid-js';
import styles from '$/core/components/date-time/date-time.module.css';
import { DateFormat, type TimeFormat, TimezoneFormat } from '$/core/utils/date';
import { tailwindUtils } from '$/core/utils/tailwind';

export type DateTimeProps = JSX.HTMLAttributes<HTMLDivElement> & {
  date: Dayjs;
  dateFormat?: DateFormat;
  timeFormat?: TimeFormat;
  showTimezone?: boolean;
  isInline?: boolean;
};

const DateTime = (passedProps: DateTimeProps) => {
  const [props, restOfProps] = splitProps(
    mergeProps({ dateFormat: DateFormat.STANDARD, showTimezone: true, isInline: false }, passedProps),
    ['class', 'date', 'dateFormat', 'timeFormat', 'showTimezone', 'isInline'],
  );

  const convertedDate = () => {
    return props.date.tz('UTC');
  };

  return (
    <div class={tailwindUtils.merge(styles.dateTime, props.class, { 'inline-flex': props.isInline })} {...restOfProps}>
      <span>{convertedDate().format(props.dateFormat)}</span>
      <Show when={props.timeFormat}>
        <span>{convertedDate().format(props.timeFormat)}</span>
      </Show>
      <Show when={props.showTimezone}>{convertedDate().format(TimezoneFormat.STANDARD)}</Show>
    </div>
  );
};

export default DateTime;
