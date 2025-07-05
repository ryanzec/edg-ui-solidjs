import { tailwindUtils } from '$/core/utils/tailwind';
import type dayjs from 'dayjs';
import { Index, type JSX, Show, createMemo, createSignal, mergeProps, splitProps } from 'solid-js';

import Button, { ButtonColor, ButtonVariant } from '$/core/components/button';
import DatePickerMonthYearSelection from '$/core/components/date-picker/date-picker-month-year-selection';
import styles from '$/core/components/date-picker/date-picker.module.css';
import FormField from '$/core/components/form-field';
import Icon from '$/core/components/icon';
import TimeInput from '$/core/components/time-input';
import { DateTimeFormat, TimeFormat, dateUtils } from '$/core/utils/date';
import { loggerUtils } from '$/core/utils/logger';

type DayData = {
  isDisabled: boolean;
  isCurrentMonth: boolean;
  date: dayjs.Dayjs;
  day: string;
  formatCurrentCheck: string;
};

export type DatePickerProps = {
  defaultDisplayDate?: Date;
  defaultSelectedDate?: Date;
  onSelectDate?: (selectedDate?: Date) => void;
  onDone?: () => void;
  includeTime?: boolean;
  includeFooter?: boolean;
  disableBefore?: Date;
  disableAfter?: Date;
};

const DatePicker = (passedProps: DatePickerProps & JSX.HTMLAttributes<HTMLDivElement>) => {
  const [props, restOfProps] = splitProps(
    mergeProps(
      {
        defaultDisplayDate: passedProps.defaultSelectedDate ?? new Date(),
        includeTime: false,
        includeFooter: false,
      },
      passedProps,
    ),
    [
      'class',
      'defaultDisplayDate',
      'onSelectDate',
      'onDone',
      'includeTime',
      'includeFooter',
      'defaultSelectedDate',
      'disableBefore',
      'disableAfter',
    ],
  );

  const currentDayFormatted = dateUtils
    .getDateWithConfiguredTimezone()
    .startOf('day')
    .format(DateTimeFormat.DATE_COMPARE);

  const [rawDisplayDate, setRawDisplayDate] = createSignal<Date>(props.defaultDisplayDate);
  const [rawSelectedDate, setRawSelectedDate] = createSignal<Date | undefined>(props.defaultSelectedDate);
  const [showMonthYearSelection, setShowMonthYearSelection] = createSignal(false);
  const [errors, setErrors] = createSignal<string[] | undefined>();
  const [timeInputValue, setTimeInputValue] = createSignal<string>(
    props.defaultSelectedDate
      ? dateUtils.getDateWithConfiguredTimezone(props.defaultSelectedDate).format(TimeFormat.STANDARD)
      : '12:00 am',
  );

  const displayDate = createMemo(() => {
    return dateUtils.getDateWithConfiguredTimezone(rawDisplayDate());
  });

  const selectedDateFormatted = createMemo(() => {
    const currentSelectedDate = rawSelectedDate();

    if (!currentSelectedDate) {
      return;
    }

    return dateUtils.getDateWithConfiguredTimezone(currentSelectedDate).format(DateTimeFormat.DATE_COMPARE);
  });
  const currentMonth = createMemo(() => {
    return displayDate().month();
  });
  const currentYear = createMemo(() => {
    return displayDate().year();
  });
  const headerText = createMemo(() => {
    return displayDate().format('MMM YYYY');
  });
  const currentViewDays = createMemo(() => {
    const currentMonthNumber = displayDate().month();
    let currentProcessingDate = dateUtils.getDateWithConfiguredTimezone(displayDate().startOf('month')).startOf('week');
    const endDate = dateUtils.getDateWithConfiguredTimezone(displayDate().endOf('month')).endOf('week');
    const newViewDays: Array<DayData[]> = [];
    let currentWeek: DayData[] = [];

    while (!currentProcessingDate.isAfter(endDate)) {
      const currentProcessingMonthNumber = currentProcessingDate.month();
      const day = currentProcessingDate.day();

      currentWeek.push({
        isDisabled:
          (!!props.disableBefore && currentProcessingDate.isBefore(props.disableBefore)) ||
          (!!props.disableAfter && currentProcessingDate.isAfter(props.disableAfter)),
        isCurrentMonth: currentProcessingMonthNumber === currentMonthNumber,
        date: currentProcessingDate,
        day: currentProcessingDate.format('D'),
        formatCurrentCheck: dateUtils
          .getDateWithConfiguredTimezone(currentProcessingDate)
          .format(DateTimeFormat.DATE_COMPARE),
      });

      // zero indexed
      if (day === 6) {
        newViewDays.push([...currentWeek]);

        currentWeek = [];
      }

      currentProcessingDate = currentProcessingDate.add(1, 'day');
    }

    return newViewDays;
  });

  const moveToNextMonth = () => {
    setRawDisplayDate(displayDate().add(1, 'month').toDate());
  };

  const moveToPreviousMonth = () => {
    setRawDisplayDate(displayDate().subtract(1, 'month').toDate());
  };

  const setMonth = (month: number) => {
    setRawDisplayDate(displayDate().month(month).toDate());
  };

  const setYear = (year: number) => {
    setRawDisplayDate(displayDate().year(year).toDate());
  };

  const handleToggleMonthYearSelection = () => {
    setShowMonthYearSelection(!showMonthYearSelection());
  };

  const handleTimeChange = (event: Event) => {
    const target = event.target as HTMLInputElement;

    setTimeInputValue(target.value);

    const currentSelectedDate = rawSelectedDate();

    if (!currentSelectedDate) {
      return;
    }

    const date = dateUtils.getDateWithConfiguredTimezone(target.value, TimeFormat.STANDARD);

    if (!date.isValid()) {
      setErrors(['Invalid time format']);

      return;
    }

    setErrors(undefined);

    setRawSelectedDate(date.toDate());
    props.onSelectDate?.(date.toDate());
  };

  const selectDate = (day: DayData) => {
    if (day.isDisabled) {
      loggerUtils.warn(`can't select a disabled day`);

      return;
    }

    const currentTimeValue = timeInputValue();
    let date = dateUtils.getDateWithConfiguredTimezone(currentTimeValue, TimeFormat.STANDARD);

    // @todo(investigate) is there an easier way to do this?
    date = date.date(day.date.date());
    date = date.month(day.date.month());
    date = date.year(day.date.year());

    if (!date.isValid()) {
      loggerUtils.warn(`can't select an invalid date`, date);

      return;
    }

    setRawSelectedDate(date.toDate());
    setRawDisplayDate(date.toDate());

    props.onSelectDate?.(date.toDate());
  };

  const clearDate = () => {
    setRawSelectedDate(undefined);
    props.onSelectDate?.(undefined);
  };

  return (
    <div data-id="date-picker" {...restOfProps} class={tailwindUtils.merge(styles.datePicker, props.class)}>
      <div class={styles.header}>
        <Icon icon="caret-left" onClick={moveToPreviousMonth} />
        <button type="button" class={styles.headerText} onClick={handleToggleMonthYearSelection}>
          {headerText()}
        </button>
        <Icon icon="caret-right" onClick={moveToNextMonth} />
      </div>
      <div class={styles.calendar}>
        <div>
          <span class={tailwindUtils.merge(styles.day, styles.dayOfWeekHeaderItem)}>Su</span>
          <span class={tailwindUtils.merge(styles.day, styles.dayOfWeekHeaderItem)}>Mo</span>
          <span class={tailwindUtils.merge(styles.day, styles.dayOfWeekHeaderItem)}>Tu</span>
          <span class={tailwindUtils.merge(styles.day, styles.dayOfWeekHeaderItem)}>We</span>
          <span class={tailwindUtils.merge(styles.day, styles.dayOfWeekHeaderItem)}>Th</span>
          <span class={tailwindUtils.merge(styles.day, styles.dayOfWeekHeaderItem)}>Fr</span>
          <span class={tailwindUtils.merge(styles.day, styles.dayOfWeekHeaderItem)}>Sa</span>
        </div>
        <Index each={currentViewDays()}>
          {(days) => {
            return (
              <div>
                <Index each={days()}>
                  {(day) => {
                    return (
                      <button
                        class={tailwindUtils.merge(styles.day, {
                          [styles.dayInactive]: !day().isCurrentMonth,
                          [styles.dayDisabled]: day().isDisabled,
                          [styles.dayCurrent]: day().formatCurrentCheck === currentDayFormatted,
                          [styles.daySelected]: day().formatCurrentCheck === selectedDateFormatted(),
                        })}
                        disabled={day().isDisabled}
                        type="button"
                        onClick={() => selectDate(day())}
                      >
                        {day().day}
                      </button>
                    );
                  }}
                </Index>
              </div>
            );
          }}
        </Index>
      </div>
      <Show when={props.includeTime}>
        <div class={styles.timeContainer}>
          <FormField errors={errors()} showErrors={false}>
            <TimeInput
              data-uncontrolled-value="true"
              onInput={handleTimeChange}
              placeholder="Time"
              value={timeInputValue()}
            />
          </FormField>
        </div>
      </Show>
      <Show when={props.includeFooter}>
        <Button.Group class={styles.footer}>
          <Button variant={ButtonVariant.GHOST} onClick={clearDate}>
            Clear
          </Button>
          <Show when={props.onDone}>
            <Button variant={ButtonVariant.FILLED} color={ButtonColor.BRAND} onClick={props.onDone}>
              Done
            </Button>
          </Show>
        </Button.Group>
      </Show>
      <Show when={showMonthYearSelection()}>
        <DatePickerMonthYearSelection
          defaultMonth={currentMonth()}
          defaultYear={currentYear()}
          onSelectMonth={setMonth}
          onSelectYear={setYear}
          toggleDisplay={handleToggleMonthYearSelection}
        />
      </Show>
    </div>
  );
};

export default DatePicker;
