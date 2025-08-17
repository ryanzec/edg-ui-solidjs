import type { DateTime as LuxonDateTime } from 'luxon';
import { type JSX, mergeProps, Show, splitProps } from 'solid-js';
import styles from '$/core/components/date-time/date-time.module.css';
import { DateFormat, type TimeFormat, TimezoneFormat } from '$/core/utils/date';
import { tailwindUtils } from '$/core/utils/tailwind';
import Typography, { TypographyColor } from '../typography';

export type DateTimeProps = JSX.HTMLAttributes<HTMLDivElement> & {
  date: LuxonDateTime;
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

  return (
    <div class={tailwindUtils.merge(styles.dateTime, props.class, { 'inline-flex': props.isInline })} {...restOfProps}>
      <Show when={props.date.isValid} fallback={<Typography color={TypographyColor.NEUTRAL}>N/A</Typography>}>
        <span>{props.date.toFormat(props.dateFormat)}</span>
        <Show when={props.timeFormat}>{(timeFormat) => <span>{props.date.toFormat(timeFormat())}</span>}</Show>
        <Show when={props.showTimezone}>{props.date.toFormat(TimezoneFormat.STANDARD)}</Show>
      </Show>
    </div>
  );
};

export default DateTime;
