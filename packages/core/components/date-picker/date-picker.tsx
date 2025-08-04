import dayjs, { type Dayjs } from 'dayjs';
import { createMemo, createSignal, Index, type JSX, mergeProps, Show, splitProps } from 'solid-js';
import Button, { ButtonColor, ButtonVariant } from '$/core/components/button';
import styles from '$/core/components/date-picker/date-picker.module.css';
import DatePickerMonthYearSelection from '$/core/components/date-picker/date-picker-month-year-selection';
import FormField from '$/core/components/form-field';
import Icon from '$/core/components/icon';
import TimeInput from '$/core/components/time-input';
import { DateTimeFormat, dateUtils, TimeFormat } from '$/core/utils/date';
import { loggerUtils } from '$/core/utils/logger';
import { tailwindUtils } from '$/core/utils/tailwind';

type DayData = {
  isDisabled: boolean;
  isCurrentMonth: boolean;
  date: dayjs.Dayjs;
  day: string;
  formatCurrentCheck: string;
};

export type DatePickerProps = {
  defaultDisplayDate?: Dayjs;
  defaultSelectedDate?: Dayjs;
  onSelectDate?: (selectedDate?: Dayjs) => void;
  onDone?: () => void;
  includeTime?: boolean;
  includeFooter?: boolean;
  disableBefore?: Dayjs;
  disableAfter?: Dayjs;
};

const DatePicker = (passedProps: DatePickerProps & JSX.HTMLAttributes<HTMLDivElement>) => {
  const [props, restOfProps] = splitProps(
    mergeProps(
      {
        defaultDisplayDate: passedProps.defaultSelectedDate ?? dayjs(),
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

  const currentDayFormatted = dayjs().startOf('day').format(DateTimeFormat.DATE_COMPARE);

  const [rawDisplayDate, setRawDisplayDate] = createSignal<Dayjs>(props.defaultDisplayDate);
  const [rawSelectedDate, setRawSelectedDate] = createSignal<Dayjs | undefined>(props.defaultSelectedDate);
  const [showMonthYearSelection, setShowMonthYearSelection] = createSignal(false);
  const [errors, setErrors] = createSignal<string[] | undefined>();
  const [timeInputValue, setTimeInputValue] = createSignal<string>(
    props.defaultSelectedDate ? dayjs(props.defaultSelectedDate).format(TimeFormat.STANDARD) : '12:00 am',
  );

  const displayDate = createMemo(() => {
    return dayjs(rawDisplayDate());
  });

  const selectedDateFormatted = createMemo(() => {
    const currentSelectedDate = rawSelectedDate();

    if (!currentSelectedDate) {
      return;
    }

    return dayjs(currentSelectedDate).format(DateTimeFormat.DATE_COMPARE);
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
    let currentProcessingDate = dayjs(displayDate().startOf('month')).startOf('week');
    const endDate = dayjs(displayDate().endOf('month')).endOf('week');
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
        formatCurrentCheck: currentProcessingDate.format(DateTimeFormat.DATE_COMPARE),
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
    setRawDisplayDate(displayDate().add(1, 'month'));
  };

  const moveToPreviousMonth = () => {
    setRawDisplayDate(displayDate().subtract(1, 'month'));
  };

  const setMonth = (month: number) => {
    setRawDisplayDate(displayDate().month(month));
  };

  const setYear = (year: number) => {
    setRawDisplayDate(displayDate().year(year));
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

    const date = dayjs(target.value, TimeFormat.STANDARD);

    if (!date.isValid()) {
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
    let date = dayjs(currentTimeValue, TimeFormat.STANDARD);

    // @todo(investigate) is there an easier way to do this?
    date = date.date(day.date.date());
    date = date.month(day.date.month());
    date = date.year(day.date.year());

    if (!date.isValid()) {
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
