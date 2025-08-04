import type { Dayjs } from 'dayjs';
import { type Accessor, createSignal } from 'solid-js';
import { DateTimeFormat } from '$/core/utils/date';

export const WhichDate = {
  FIRST: 'first',
  SECOND: 'second',
} as const;

export type WhichDate = (typeof WhichDate)[keyof typeof WhichDate];

export type DateFormValue = undefined | Array<Dayjs | undefined>;

export type DateStore = {
  date: Accessor<Dayjs | undefined>;
  setDate: (date?: Dayjs) => void;
  getFormattedDate: () => string;
};

type CreateDateStoreOptions = {
  defaultDate?: Dayjs;
  includeTime?: boolean;
};

const createDateStore = (options: CreateDateStoreOptions): DateStore => {
  const [date, setDate] = createSignal<Dayjs | undefined>(options.defaultDate);

  const getFormattedDate = () => {
    const currentDate = date();

    if (!currentDate) {
      return '';
    }

    return currentDate.format(options.includeTime ? DateTimeFormat.STANDARD_DATE_TIME : DateTimeFormat.STANDARD_DATE);
  };

  return {
    date,
    setDate,
    getFormattedDate,
  };
};

export type DateRangeStore = {
  startDate: Accessor<Dayjs | undefined>;
  endDate: Accessor<Dayjs | undefined>;
  setDate: (date?: Dayjs, which?: WhichDate) => void;
  getFormValue: () => DateFormValue;
};

type CreateDateRangeStoreOptions = {
  defaultStartDate?: Dayjs;
  defaultEndDate?: Dayjs;
};

const createDateRangeStore = (options: CreateDateRangeStoreOptions = {}): DateRangeStore => {
  const [startDate, setStartDate] = createSignal<Dayjs | undefined>(options.defaultStartDate);
  const [endDate, startEndDate] = createSignal<Dayjs | undefined>(options.defaultEndDate);

  const getFormValue = () => {
    const currentStartDate = startDate();
    const currentEndDate = endDate();

    if (!currentStartDate && !currentEndDate) {
      return;
    }

    return [currentStartDate, currentEndDate];
  };

  const setDate = (date?: Dayjs, which?: WhichDate) => {
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
