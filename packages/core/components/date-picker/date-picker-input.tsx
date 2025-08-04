import { autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
import dayjs, { type Dayjs } from 'dayjs';
import { createEffect, createMemo, createSignal, mergeProps, onCleanup, Show, splitProps } from 'solid-js';
import DatePicker, { type DatePickerProps } from '$/core/components/date-picker/date-picker';
import styles from '$/core/components/date-picker/date-picker.module.css';
import Input, { type InputProps } from '$/core/components/input';
import { clickOutsideDirective } from '$/core/directives/click-outside-directive';
import { dateStoreUtils, WhichDate } from '$/core/stores/date.store';
import { type DefaultFormData, formDataAttribute } from '$/core/stores/form.store';
import type { CommonDataAttributes } from '$/core/types/generic';
import { dateUtils } from '$/core/utils/date';
import { loggerUtils } from '$/core/utils/logger';
import { tailwindUtils } from '$/core/utils/tailwind';

// this is needed to avoid this code being stripped in compilation because of the way directive work in SolidJS
clickOutsideDirective;

export type DatePickerAllowedRange = {
  value: number;
  type: 'day' | 'week' | 'month' | 'year';
};

export type DatePickerInputProps<TFormData = DefaultFormData> = InputProps<TFormData> &
  Omit<DatePickerProps, 'onSelectDate' | 'defaultSelectedDate' | 'defaultDisplayDate'> &
  CommonDataAttributes & {
    isRange?: boolean;
    onSelectDate?: (date?: Dayjs, which?: WhichDate) => void;
    defaultStartDisplayDate?: Dayjs;
    defaultStartSelectedDate?: Dayjs;
    defaultEndDisplayDate?: Dayjs;
    defaultEndSelectedDate?: Dayjs;
    allowedRange?: DatePickerAllowedRange;
  };

const DatePickerInput = <TFormData = DefaultFormData>(passedProps: DatePickerInputProps<TFormData>) => {
  const [customProps, restOfProps] = splitProps(
    mergeProps(
      {
        isRange: false,
        defaultStartDisplayDate: passedProps.defaultStartSelectedDate ?? dayjs(),
        defaultEndDisplayDate: passedProps.defaultEndSelectedDate ?? dayjs(),
      },
      passedProps,
    ),
    [
      'children',
      'class',
      'onSelectDate',
      'includeTime',
      'isRange',
      'defaultStartDisplayDate',
      'defaultStartSelectedDate',
      'defaultEndDisplayDate',
      'defaultEndSelectedDate',
      'allowedRange',
    ],
  );
  const [props, datePickerProps] = splitProps(customProps, [
    'children',
    'class',
    'onSelectDate',
    'isRange',
    'defaultStartDisplayDate',
    'defaultStartSelectedDate',
    'defaultEndDisplayDate',
    'defaultEndSelectedDate',
    'allowedRange',
  ]);

  const [containerElementRef, setContainerElementRef] = createSignal<HTMLDivElement>();
  const [inputElementRef, setInputElementRef] = createSignal<HTMLInputElement>();
  const [isDatePickerVisible, setIsDatePickerVisible] = createSignal(false);
  const startDate = dateStoreUtils.createDateStore({
    includeTime: datePickerProps.includeTime,
    defaultDate: props.defaultStartSelectedDate,
  });
  const endDate = dateStoreUtils.createDateStore({
    includeTime: datePickerProps.includeTime,
    defaultDate: props.defaultEndSelectedDate,
  });

  const startDisableBefore = createMemo<Dayjs | undefined>(() => {
    // if we don't have the data for applying an allowed range, we should not have any limit
    if (!props.allowedRange || !endDate.date()) {
      return undefined;
    }

    let disableBefore = dayjs(endDate.date()).subtract(props.allowedRange.value, props.allowedRange.type);

    if (datePickerProps.includeTime) {
      disableBefore = disableBefore.startOf('day');
    }

    return disableBefore;
  });

  const startDisableAfter = createMemo<Dayjs | undefined>(() => {
    // a date range should not allow for a backwards selection
    if (endDate.date()) {
      return dayjs(endDate.date()).endOf('day');
    }

    // if we don't have the data for applying an allowed range, we should not have any limit
    if (!props.allowedRange || !startDate.date()) {
      return undefined;
    }

    let disableAfter = dayjs(startDate.date()).add(props.allowedRange.value, props.allowedRange.type);

    if (datePickerProps.includeTime) {
      disableAfter = disableAfter.endOf('day');
    }

    return disableAfter;
  });

  const endDisableBefore = createMemo<Dayjs | undefined>(() => {
    // a date range should not allow for a backwards selection
    if (startDate.date()) {
      return dayjs(startDate.date()).startOf('day');
    }

    // if we don't have the data for applying an allowed range, we should not have any limit
    if (!props.allowedRange || !endDate.date()) {
      return undefined;
    }

    let disableBefore = dayjs(endDate.date()).subtract(props.allowedRange.value, props.allowedRange.type);

    if (datePickerProps.includeTime) {
      disableBefore = disableBefore.startOf('day');
    }

    return disableBefore;
  });

  const endDisableAfter = createMemo<Dayjs | undefined>(() => {
    // if we don't have the data for applying an allowed range, we should not have any limit
    if (!props.allowedRange || !startDate.date()) {
      return undefined;
    }

    let disableBefore = dayjs(startDate.date()).add(props.allowedRange.value, props.allowedRange.type);

    if (datePickerProps.includeTime) {
      disableBefore = disableBefore.endOf('day');
    }

    return disableBefore;
  });

  const showDatePicker = () => {
    const currentInputElement = inputElementRef();

    if (currentInputElement) {
      // since when the user interacts with the date picker, the input would technically become blurred however
      // in this case we don't really want to consider it blurred as the date picker in really part of the input
      // so this can be used by other parts of the code (like form validation)
      currentInputElement.setAttribute(formDataAttribute.BLURRED, 'false');
    }

    setIsDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    if (!isDatePickerVisible()) {
      return;
    }

    const currentInputElement = inputElementRef();

    if (currentInputElement) {
      // once the date picker is no longer visible, the user has truly blurred the input so we can force that event
      currentInputElement.setAttribute(formDataAttribute.BLURRED, 'true');
      currentInputElement.dispatchEvent(new Event('blur'));
    }

    setIsDatePickerVisible(false);
  };

  const handleSelectDate = (selectedDate?: Dayjs, which?: WhichDate) => {
    const currentInputElement = inputElementRef();

    if (!currentInputElement) {
      return;
    }

    if (which === WhichDate.FIRST) {
      startDate.setDate(selectedDate);
    } else {
      endDate.setDate(selectedDate);
    }

    props.onSelectDate?.(selectedDate, which);
  };

  const handleSelectStartDate = (date?: Dayjs) => {
    const dataToUse = datePickerProps.includeTime ? date : date?.startOf('day');

    handleSelectDate(dataToUse, WhichDate.FIRST);
  };

  const handleSelectEndDate = (date?: Dayjs) => {
    const dataToUse = datePickerProps.includeTime ? date : date?.endOf('day');

    handleSelectDate(dataToUse, WhichDate.SECOND);
  };

  createEffect(function updateInput() {
    const currentInputElement = inputElementRef();

    if (!currentInputElement) {
      return;
    }

    const startDateFormatted = startDate.getFormattedDate();
    const endDateFormatted = endDate.getFormattedDate();
    const currentValue = currentInputElement.value;

    if (!startDateFormatted && !endDateFormatted) {
      if (currentValue) {
        currentInputElement.value = '';
        currentInputElement.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
      }

      return;
    }

    const inputValue = props.isRange ? `${startDateFormatted} - ${endDateFormatted}` : startDateFormatted;

    if (currentValue === inputValue) {
      return;
    }

    currentInputElement.value = inputValue;
    currentInputElement.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
  });

  createEffect(function positionDatePickerFloatingElement() {
    const currentContainerElement = containerElementRef();

    if (!currentContainerElement) {
      return;
    }

    // we need to use :scope so that the selector only look at direct children
    const handleElement = currentContainerElement.querySelector(':scope > :nth-child(1)');
    const contentElement = currentContainerElement.querySelector(':scope > :nth-child(2)') as HTMLElement;

    if (!handleElement || !contentElement) {
      loggerUtils.error('date picker input component must have 2 children to function properly');

      return;
    }

    const updatePosition = () => {
      computePosition(handleElement, contentElement, {
        placement: 'bottom-start',
        // @todo(feature) should this be configurable?
        middleware: [flip(), shift(), offset(5)],
      }).then(({ x, y }) => {
        contentElement.style.top = `${y}px`;
        contentElement.style.left = `${x}px`;
      });
    };

    const cleanup = autoUpdate(handleElement, contentElement, updatePosition);

    onCleanup(() => {
      cleanup();
    });
  });

  return (
    <div
      data-id="date-picker-input"
      ref={setContainerElementRef}
      class={tailwindUtils.merge(styles.datePickerInput, props.class)}
      use:clickOutsideDirective={{ callback: hideDatePicker }}
    >
      <Input
        ref={setInputElementRef}
        data-id="date-picker-input"
        {...restOfProps}
        onFocus={showDatePicker}
        readonly
        includeReadonlyStyles={false}
        data-uncontrolled-value="true"
      />
      <div class={styles.datePickerInputPickerContainer}>
        <Show when={isDatePickerVisible()}>
          <DatePicker
            {...datePickerProps}
            defaultDisplayDate={startDate.date() ?? props.defaultStartDisplayDate}
            defaultSelectedDate={startDate.date() ?? props.defaultStartSelectedDate}
            disableAfter={startDisableAfter()}
            disableBefore={startDisableBefore()}
            onSelectDate={handleSelectStartDate}
            includeFooter
            onDone={hideDatePicker}
          />
          <Show when={props.isRange}>
            <DatePicker
              {...datePickerProps}
              defaultDisplayDate={endDate.date() ?? props.defaultEndDisplayDate}
              defaultSelectedDate={endDate.date() ?? props.defaultEndSelectedDate}
              disableBefore={endDisableBefore()}
              disableAfter={endDisableAfter()}
              onSelectDate={handleSelectEndDate}
              includeFooter
              onDone={hideDatePicker}
            />
          </Show>
        </Show>
      </div>
    </div>
  );
};

export default DatePickerInput;
