import styles from '$/core/components/date-time/date-time.module.css';
import type { CustomDayjs } from '$/core/utils/date';
import { tailwindUtils } from '$/core/utils/tailwind';
import { type JSX, splitProps } from 'solid-js';

export type DateTimeFromNowProps = JSX.HTMLAttributes<HTMLDivElement> & {
  date: CustomDayjs;
};

const DateTimeFromNow = (passedProps: DateTimeFromNowProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['class', 'date']);

  return (
    <div class={tailwindUtils.merge(styles.dateTime, props.class)} {...restOfProps}>
      <span>{props.date.fromNow()}</span>
    </div>
  );
};

export default DateTimeFromNow;
