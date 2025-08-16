import type { DateTime } from 'luxon';
import { type JSX, splitProps } from 'solid-js';
import styles from '$/core/components/date-time/date-time.module.css';
import { tailwindUtils } from '$/core/utils/tailwind';

export type DateTimeFromNowProps = JSX.HTMLAttributes<HTMLDivElement> & {
  date: DateTime;
};

const DateTimeFromNow = (passedProps: DateTimeFromNowProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['class', 'date']);

  return (
    <div class={tailwindUtils.merge(styles.dateTime, props.class)} {...restOfProps}>
      <span>{props.date.toRelative()}</span>
    </div>
  );
};

export default DateTimeFromNow;
