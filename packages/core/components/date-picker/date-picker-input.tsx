import { autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
import { DateTime } from 'luxon';
import { createEffect, createMemo, createSignal, mergeProps, onCleanup, Show, splitProps } from 'solid-js';
import DatePicker, { type DatePickerProps } from '$/core/components/date-picker/date-picker';
import styles from '$/core/components/date-picker/date-picker.module.css';
import Input, { type InputProps } from '$/core/components/input';
import { clickOutsideDirective } from '$/core/directives/click-outside-directive';
import { dateStoreUtils, WhichDate } from '$/core/stores/date.store';
import { type DefaultFormData, formDataAttribute } from '$/core/stores/form.store';
import type { CommonDataAttributes } from '$/core/types/generic';
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
    onSelectDate?: (date?: DateTime, which?: WhichDate) => void;
    defaultStartDisplayDate?: DateTime;
    defaultStartSelectedDate?: DateTime;
    defaultEndDisplayDate?: DateTime;
    defaultEndSelectedDate?: DateTime;
    allowedRange?: DatePickerAllowedRange;
  };

const DatePickerInput = <TFormData = DefaultFormData>(passedProps: DatePickerInputProps<TFormData>) => {
  const [customProps, restOfProps] = splitProps(
    mergeProps(
      {
        isRange: false,
        defaultStartDisplayDate: passedProps.defaultStartSelectedDate ?? DateTime.now(),
        defaultEndDisplayDate: passedProps.defaultEndSelectedDate ?? DateTime.now(),
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

  const startDisableBefore = createMemo<DateTime | undefined>(() => {
    const currentEndDate = endDate.date();

    // if we don't have the data for applying an allowed range, we should not have any limit
    if (!props.allowedRange || !currentEndDate) {
      return undefined;
    }

    let disableBefore = currentEndDate.minus({ [props.allowedRange.type]: props.allowedRange.value });

    if (!datePickerProps.includeTime) {
      disableBefore = disableBefore.startOf('day');
    }

    return disableBefore;
  });

  const startDisableAfter = createMemo<DateTime | undefined>(() => {
    const currentEndDate = endDate.date();

    // a date range should not allow for a backwards selection
    if (currentEndDate) {
      return currentEndDate.endOf('day');
    }

    return undefined;
  });

  const endDisableBefore = createMemo<DateTime | undefined>(() => {
    // a date range should not allow for a backwards selection
    const currentStartDate = startDate.date();

    if (currentStartDate) {
      return currentStartDate.startOf('day');
    }

    return undefined;
  });

  const endDisableAfter = createMemo<DateTime | undefined>(() => {
    const currentStartDate = startDate.date();

    // if we don't have the data for applying an allowed range, we should not have any limit
    if (!props.allowedRange || !currentStartDate) {
      return undefined;
    }

    let disableAfter = currentStartDate.plus({ [props.allowedRange.type]: props.allowedRange.value });

    if (!datePickerProps.includeTime) {
      disableAfter = disableAfter.endOf('day');
    }

    return disableAfter;
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

  const handleSelectDate = (selectedDate?: DateTime, which?: WhichDate) => {
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

  const handleSelectStartDate = (date?: DateTime) => {
    const dataToUse = datePickerProps.includeTime ? date : date?.startOf('day');

    handleSelectDate(dataToUse, WhichDate.FIRST);
  };

  const handleSelectEndDate = (date?: DateTime) => {
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
