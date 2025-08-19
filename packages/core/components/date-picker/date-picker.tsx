import { DateTime } from 'luxon';
import { createMemo, createSignal, Index, type JSX, mergeProps, Show, splitProps } from 'solid-js';
import Button, { ButtonColor, ButtonVariant } from '$/core/components/button';
import styles from '$/core/components/date-picker/date-picker.module.css';
import DatePickerMonthYearSelection from '$/core/components/date-picker/date-picker-month-year-selection';
import FormField from '$/core/components/form-field';
import Icon from '$/core/components/icon';
import TimeInput from '$/core/components/time-input';
import { DateFormat, DateTimeFormat, TimeFormat } from '$/core/utils/date';
import { loggerUtils } from '$/core/utils/logger';
import { tailwindUtils } from '$/core/utils/tailwind';

type DayData = {
  isDisabled: boolean;
  isCurrentMonth: boolean;
  date: DateTime;
  day: string;
  formatCurrentCheck: string;
};

export type DatePickerProps = {
  defaultDisplayDate?: DateTime;
  defaultSelectedDate?: DateTime;
  onSelectDate?: (selectedDate?: DateTime) => void;
  onDone?: () => void;
  includeTime?: boolean;
  includeFooter?: boolean;
  disableBefore?: DateTime;
  disableAfter?: DateTime;
};

const DatePicker = (passedProps: DatePickerProps & JSX.HTMLAttributes<HTMLDivElement>) => {
  const [props, restOfProps] = splitProps(
    mergeProps(
      {
        defaultDisplayDate: passedProps.defaultSelectedDate ?? DateTime.now(),
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

  const currentDayFormatted = DateTime.now().startOf('day').toFormat(DateFormat.COMPARE);

  const [rawDisplayDate, setRawDisplayDate] = createSignal<DateTime>(props.defaultDisplayDate);
  const [rawSelectedDate, setRawSelectedDate] = createSignal<DateTime | undefined>(props.defaultSelectedDate);
  const [showMonthYearSelection, setShowMonthYearSelection] = createSignal(false);
  const [errors, setErrors] = createSignal<string[] | undefined>();
  const [timeInputValue, setTimeInputValue] = createSignal<string>(
    props.defaultSelectedDate ? props.defaultSelectedDate.toFormat(TimeFormat.STANDARD) : '12:00 AM',
  );

  const displayDate = createMemo(() => {
    return rawDisplayDate();
  });

  const selectedDateFormatted = createMemo(() => {
    const currentSelectedDate = rawSelectedDate();

    if (!currentSelectedDate) {
      return;
    }

    return currentSelectedDate.toFormat(DateFormat.COMPARE);
  });
  const currentMonth = createMemo(() => {
    return displayDate().month;
  });
  const currentYear = createMemo(() => {
    return displayDate().year;
  });
  const headerText = createMemo(() => {
    return displayDate().toFormat(DateFormat.MONTH_YEAR);
  });
  const currentViewDays = createMemo(() => {
    const currentMonthNumber = displayDate().month;
    let currentProcessingDate = displayDate().startOf('month').startOf('week', { useLocaleWeeks: true });
    const endDate = displayDate().endOf('month').endOf('week', { useLocaleWeeks: true });
    const newViewDays: Array<DayData[]> = [];
    let currentWeek: DayData[] = [];

    while (currentProcessingDate < endDate) {
      const currentProcessingMonthNumber = currentProcessingDate.month;
      const day = currentProcessingDate.weekday;

      currentWeek.push({
        isDisabled:
          (!!props.disableBefore && currentProcessingDate < props.disableBefore) ||
          (!!props.disableAfter && currentProcessingDate > props.disableAfter),
        isCurrentMonth: currentProcessingMonthNumber === currentMonthNumber,
        date: currentProcessingDate,
        day: currentProcessingDate.toFormat(DateFormat.DAY),
        formatCurrentCheck: currentProcessingDate.toFormat(DateFormat.COMPARE),
      });

      // we force a sun -> sat week in the date util configuration so 6 mean we are at the end of the week (since
      // in luxon, 7 = sun)
      if (day === 6) {
        newViewDays.push([...currentWeek]);

        currentWeek = [];
      }

      currentProcessingDate = currentProcessingDate.plus({ days: 1 });
    }

    return newViewDays;
  });

  const moveToNextMonth = () => {
    setRawDisplayDate(displayDate().plus({ months: 1 }));
  };

  const moveToPreviousMonth = () => {
    setRawDisplayDate(displayDate().minus({ months: 1 }));
  };

  const setMonth = (month: number) => {
    setRawDisplayDate(displayDate().set({ month }));
  };

  const setYear = (year: number) => {
    setRawDisplayDate(displayDate().set({ year }));
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

    const date = DateTime.fromFormat(target.value, TimeFormat.STANDARD);

    if (!date.isValid) {
      setErrors(['Invalid time format']);

      return;
    }

    setErrors(undefined);

    setRawSelectedDate(date);
    props.onSelectDate?.(date);
  };

  const selectDate = (day: DayData) => {
    if (day.isDisabled) {
      loggerUtils.warn(`can't select a disabled day`);

      return;
    }

    const currentTimeValue = timeInputValue();
    let date = DateTime.fromFormat(currentTimeValue, TimeFormat.STANDARD);

    // @todo(investigate) is there an easier way to do this?
    date = date.set({
      day: day.date.day,
      month: day.date.month,
      year: day.date.year,
    });

    if (!date.isValid) {
      loggerUtils.warn(`can't select an invalid date`, date);

      return;
    }

    setRawSelectedDate(date);
    setRawDisplayDate(date);

    props.onSelectDate?.(date);
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
