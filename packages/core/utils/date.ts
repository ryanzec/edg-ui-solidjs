import dayjs, { type Dayjs } from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

export const TimezoneFormat = {
  STANDARD: 'z',
} as const;

export type TimezoneFormat = (typeof TimezoneFormat)[keyof typeof TimezoneFormat];

// since this is designed to be able to create one off formats, no need for timezone version
export const DateFormat = {
  STANDARD: 'M/D/YY',
  COMPARE: 'YYYYMMDD',
} as const;

export type DateFormat = (typeof DateFormat)[keyof typeof DateFormat];

// since this is designed to be able to create one off formats, no need for timezone version
export const TimeFormat = {
  STANDARD: 'h:mm a',
  STANDARD_WITH_SECONDS: 'h:mm:ss a',
} as const;

export type TimeFormat = (typeof TimeFormat)[keyof typeof TimeFormat];

export const DateTimeFormat = {
  STANDARD_DATE: DateFormat.STANDARD,
  STANDARD_DATE_TIMEZONE: `${DateFormat.STANDARD} ${TimezoneFormat.STANDARD}`,
  STANDARD_DATE_TIME: `${DateFormat.STANDARD} ${TimeFormat.STANDARD}`,
  STANDARD_DATE_TIME_TIMEZONE: `${DateFormat.STANDARD} ${TimeFormat.STANDARD} ${TimezoneFormat.STANDARD}`,
  DATE_COMPARE: DateFormat.COMPARE,
} as const;

export type DateTimeFormat = (typeof DateTimeFormat)[keyof typeof DateTimeFormat];

const getDaysBetweenDates = (startDate: Dayjs, endDate: Dayjs) => {
  return endDate.diff(startDate, 'days') + 1;
};

const configureTimezone = (timezone: string) => {
  dayjs.tz.setDefault(timezone);
};

export const dateUtils = {
  configureTimezone,
  getDaysBetweenDates,
};
