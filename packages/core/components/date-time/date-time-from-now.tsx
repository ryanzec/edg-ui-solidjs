import type { DateTime } from 'luxon';
import { type JSX, Show, splitProps } from 'solid-js';
import styles from '$/core/components/date-time/date-time.module.css';
import { tailwindUtils } from '$/core/utils/tailwind';
import Typography, { TypographyColor } from '../typography';

export type DateTimeFromNowProps = JSX.HTMLAttributes<HTMLDivElement> & {
  date: DateTime;
};

const DateTimeFromNow = (passedProps: DateTimeFromNowProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['class', 'date']);

  return (
    <div class={tailwindUtils.merge(styles.dateTime, props.class)} {...restOfProps}>
      <Show when={props.date.isValid} fallback={<Typography color={TypographyColor.NEUTRAL}>N/A</Typography>}>
        <span>{props.date.toRelative()}</span>
      </Show>
    </div>
  );
};

export default DateTimeFromNow;
