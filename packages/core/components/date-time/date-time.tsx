import styles from '$/core/components/date-time/date-time.module.css';
import { DateFormat, type TimeFormat, TimezoneFormat } from '$/core/utils/date';
import classnames from 'classnames';
import type { Dayjs } from 'dayjs';
import { type JSX, Show, mergeProps, splitProps } from 'solid-js';

export type DateTimeProps = JSX.HTMLAttributes<HTMLDivElement> & {
  date: Dayjs;
  dateFormat?: DateFormat;
  timeFormat?: TimeFormat;
  showTimezone?: boolean;
};

const DateTime = (passedProps: DateTimeProps) => {
  const [props, restOfProps] = splitProps(
    mergeProps({ dateFormat: DateFormat.STANDARD, showTimezone: true }, passedProps),
    ['class', 'date', 'dateFormat', 'timeFormat', 'showTimezone'],
  );

  const convertedDate = () => {
    return props.date.tz('UTC');
  };

  return (
    <div class={classnames(styles.dateTime, props.class)} {...restOfProps}>
      <span>{convertedDate().format(props.dateFormat)}</span>
      <Show when={props.timeFormat}>
        <span>{convertedDate().format(props.timeFormat)}</span>
      </Show>
      <Show when={props.showTimezone}>{convertedDate().format(TimezoneFormat.STANDARD)}</Show>
    </div>
  );
};

export default DateTime;
