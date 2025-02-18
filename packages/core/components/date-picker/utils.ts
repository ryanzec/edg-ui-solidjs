import dayjs from 'dayjs';
import { type Accessor, createSignal } from 'solid-js';

import { WhichDate } from '$/core/components/date-picker/date-picker-input';
import { dateTimeFormat } from '$/core/utils/date';

export type DatePickerInputDateStore = {
  date: Accessor<Date | undefined>;
  setDate: (date?: Date) => void;
  getFormattedDate: () => string;
};

type CreateDatePickerInputDateOptions = {
  defaultDate?: Date;
  includeTime?: boolean;
};

const createInputDateStore = (options: CreateDatePickerInputDateOptions): DatePickerInputDateStore => {
  const [date, setDate] = createSignal<Date | undefined>(options.defaultDate);

  const getFormattedDate = () => {
    const currentDate = date();

    if (!currentDate) {
      return '';
    }

    return dayjs(currentDate).format(
      options.includeTime ? dateTimeFormat.STANDARD_DATE_TIME : dateTimeFormat.STANDARD_DATE,
    );
  };

  return {
    date,
    setDate,
    getFormattedDate,
  };
};

export type DateFormValue = undefined | Array<Date | undefined>;

export type DatePickerInputValueStore = {
  startDate: Accessor<Date | undefined>;
  endDate: Accessor<Date | undefined>;
  setDate: (date?: Date, which?: WhichDate) => void;
  getFormValue: () => DateFormValue;
};

type createDatePickerInputValueOptions = {
  defaultStartDate?: Date;
  defaultEndDate?: Date;
};

const createInputValueStore = (options: createDatePickerInputValueOptions = {}): DatePickerInputValueStore => {
  const [startDate, setStartDate] = createSignal<Date | undefined>(options.defaultStartDate);
  const [endDate, startEndDate] = createSignal<Date | undefined>(options.defaultEndDate);

  const getFormValue = () => {
    const currentStartDate = startDate();
    const currentEndDate = endDate();

    if (!currentStartDate && !currentEndDate) {
      return;
    }

    return [currentStartDate, currentEndDate];
  };

  const setDate = (date?: Date, which?: WhichDate) => {
    if (which !== WhichDate.SECOND) {
      setStartDate(date);

      return;
    }

    startEndDate(date);
  };

  return { startDate, endDate, setDate, getFormValue };
};

const isValidDate = (value: DateFormValue) => {
  return !!value && !!value[0];
};

const isValidDateRange = (value: DateFormValue) => {
  return !!value && !!value[0] && !!value[1];
};

export const datePickerComponentUtils = {
  createInputDateStore,
  createInputValueStore,
  isValidDate,
  isValidDateRange,
};
