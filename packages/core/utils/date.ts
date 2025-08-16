import { type DateTime, Settings } from 'luxon';

export const TimezoneFormat = {
  STANDARD: 'ZZZZ',
} as const;

export type TimezoneFormat = (typeof TimezoneFormat)[keyof typeof TimezoneFormat];

export const DateFormat = {
  STANDARD: 'M/d/yy',
  COMPARE: 'yyyyLLdd',
} as const;

export type DateFormat = (typeof DateFormat)[keyof typeof DateFormat];

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

const getDaysBetweenDates = (startDate: DateTime, endDate: DateTime) => {
  return endDate.diff(startDate, 'days').days + 1;
};

const configureTimezone = (timezone: string) => {
  Settings.defaultZone = timezone;

  // since firefox does not support weekinfo for intl locale, we are just going to force sun -> sat as the week for
  // all users until we decide it is worth the effort to address (or Firefox support this) or just make this
  // configurable on by the user
  Settings.defaultWeekSettings = { firstDay: 7, minimalDays: 1, weekend: [6, 7] };
};

export const dateUtils = {
  configureTimezone,
  getDaysBetweenDates,
};
