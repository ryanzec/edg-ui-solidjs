import type { DateTime } from 'luxon';
import { type Accessor, createSignal } from 'solid-js';
import { DateFormat, DateTimeFormat } from '$/core/utils/date';

export const WhichDate = {
  FIRST: 'first',
  SECOND: 'second',
} as const;

export type WhichDate = (typeof WhichDate)[keyof typeof WhichDate];

export type DateFormValue = undefined | Array<DateTime | undefined>;

export type DateStore = {
  date: Accessor<DateTime | undefined>;
  setDate: (date?: DateTime) => void;
  getFormattedDate: () => string;
};

type CreateDateStoreOptions = {
  defaultDate?: DateTime;
  includeTime?: boolean;
};

const createDateStore = (options: CreateDateStoreOptions): DateStore => {
  const [date, setDate] = createSignal<DateTime | undefined>(options.defaultDate);

  const getFormattedDate = () => {
    const currentDate = date();

    if (!currentDate) {
      return '';
    }

    return currentDate.toFormat(options.includeTime ? DateTimeFormat.STANDARD : DateFormat.STANDARD);
  };

  return {
    date,
    setDate,
    getFormattedDate,
  };
};

export type DateRangeStore = {
  startDate: Accessor<DateTime | undefined>;
  endDate: Accessor<DateTime | undefined>;
  setDate: (date?: DateTime, which?: WhichDate) => void;
  getFormValue: () => DateFormValue;
};

type CreateDateRangeStoreOptions = {
  defaultStartDate?: DateTime;
  defaultEndDate?: DateTime;
};

const createDateRangeStore = (options: CreateDateRangeStoreOptions = {}): DateRangeStore => {
  const [startDate, setStartDate] = createSignal<DateTime | undefined>(options.defaultStartDate);
  const [endDate, startEndDate] = createSignal<DateTime | undefined>(options.defaultEndDate);

  const getFormValue = () => {
    const currentStartDate = startDate();
    const currentEndDate = endDate();

    if (!currentStartDate && !currentEndDate) {
      return;
    }

    return [currentStartDate, currentEndDate];
  };

  const setDate = (date?: DateTime, which?: WhichDate) => {
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
