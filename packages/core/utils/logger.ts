import { HttpError } from '$/core/utils/http';
import posthog from 'posthog-js';

export const LogMode = {
  PRODUCTION: 'production',
  DEVELOPMENT: 'development',
} as const;

export type LogMode = (typeof LogMode)[keyof typeof LogMode];

let loggingMode: LogMode = import.meta.env.MODE as LogMode;

// biome-ignore lint/suspicious/noExplicitAny: match native api
const log = (...args: any) => {
  if (loggingMode !== 'production') {
    console.log(...args);
  }
};

// biome-ignore lint/suspicious/noExplicitAny: match native api
const warn = (...args: any) => {
  posthog.capture('$exception', {
    $exception_type: 'console_warning',
    $exception_message: 'Something went wrong',
    $exception_stack_trace_raw: console.trace(),
    console_arguments: args,
  });

  console.warn(...args);
};

// biome-ignore lint/suspicious/noExplicitAny: match native api
const error = (...args: any) => {
  posthog.capture('$exception', {
    $exception_type: 'console_error',
    $exception_message: 'Something went wrong',
    $exception_stack_trace_raw: console.trace(),
    console_arguments: args,
  });

  console.error(...args);
};

const getErrorInstanceMessage = (err: Error): string => {
  if (err instanceof HttpError && err.context.jsonResponse?.error?.message) {
    return err.context.jsonResponse?.error?.message;
  }

  return err.message;
};

const setLoggingMode = (mode: LogMode) => {
  loggingMode = mode;
};

export const loggerUtils = {
  log,
  warn,
  error,
  getErrorInstanceMessage,
  setLoggingMode,
};
