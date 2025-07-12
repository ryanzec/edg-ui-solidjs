import { DateTimeFormat, dateUtils } from '$/core/utils/date';
import { type Accessor, createSignal } from 'solid-js';

export const WhichDate = {
  FIRST: 'first',
  SECOND: 'second',
} as const;

export type WhichDate = (typeof WhichDate)[keyof typeof WhichDate];

export type DateFormValue = undefined | Array<Date | undefined>;

export type DateStore = {
  date: Accessor<Date | undefined>;
  setDate: (date?: Date) => void;
  getFormattedDate: () => string;
};

type CreateDateStoreOptions = {
  defaultDate?: Date;
  includeTime?: boolean;
};

const createDateStore = (options: CreateDateStoreOptions): DateStore => {
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

export type DateRangeStore = {
  startDate: Accessor<Date | undefined>;
  endDate: Accessor<Date | undefined>;
  setDate: (date?: Date, which?: WhichDate) => void;
  getFormValue: () => DateFormValue;
};

type CreateDateRangeStoreOptions = {
  defaultStartDate?: Date;
  defaultEndDate?: Date;
};

const createDateRangeStore = (options: CreateDateRangeStoreOptions = {}): DateRangeStore => {
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

export const dateStoreUtils = {
  createDateStore,
  createDateRangeStore,
};
