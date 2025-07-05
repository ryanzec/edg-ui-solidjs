import { type Accessor, createSignal } from 'solid-js';

import { DateTimeFormat, dateUtils } from '$/core/utils/date';

export const WhichDate = {
  FIRST: 'first',
  SECOND: 'second',
} as const;

export type WhichDate = (typeof WhichDate)[keyof typeof WhichDate];

export type InputDateStore = {
  date: Accessor<Date | undefined>;
  setDate: (date?: Date) => void;
  getFormattedDate: () => string;
};

type CreateInputDateStoreOptions = {
  defaultDate?: Date;
  includeTime?: boolean;
};

const createInputDateStore = (options: CreateInputDateStoreOptions): InputDateStore => {
  const [date, setDate] = createSignal<Date | undefined>(options.defaultDate);

  const getFormattedDate = () => {
    const currentDate = date();

    if (!currentDate) {
      return '';
    }

    return dateUtils
      .getDateWithConfiguredTimezone(currentDate)
      .format(options.includeTime ? DateTimeFormat.STANDARD_DATE_TIME : DateTimeFormat.STANDARD_DATE);
  };

  return {
    date,
    setDate,
    getFormattedDate,
  };
};

export type DateFormValue = undefined | Array<Date | undefined>;

export type InputDateRangeStore = {
  startDate: Accessor<Date | undefined>;
  endDate: Accessor<Date | undefined>;
  setDate: (date?: Date, which?: WhichDate) => void;
  getFormValue: () => DateFormValue;
};

type CreateInputDateRangeStoreOptions = {
  defaultStartDate?: Date;
  defaultEndDate?: Date;
};

const createInputDateRangeStore = (options: CreateInputDateRangeStoreOptions = {}): InputDateRangeStore => {
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
  createInputDateRangeStore,
  isValidDate,
  isValidDateRange,
};
