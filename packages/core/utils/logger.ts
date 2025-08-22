import posthog from 'posthog-js';
import { HttpError } from '$/core/utils/http';

export const LogMode = {
  PRODUCTION: 'production',
  DEVELOPMENT: 'development',
} as const;

export type LogMode = (typeof LogMode)[keyof typeof LogMode];

let loggingMode: LogMode = (import.meta?.env?.MODE as LogMode) || LogMode.PRODUCTION;

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

type ErrorMessageOptions = {
  defaultMessage?: string;
};

const getErrorMessage = (err: Error, options: ErrorMessageOptions = {}): string => {
  if (err instanceof HttpError && err.context.jsonResponse?.error?.message) {
    return err.context.jsonResponse?.error?.message;
  }

  return options.defaultMessage !== undefined ? options.defaultMessage : err.message;
};

const setLoggingMode = (mode: LogMode) => {
  loggingMode = mode;
};

export const loggerUtils = {
  log,
  warn,
  error,
  getErrorInstanceMessage: getErrorMessage,
  setLoggingMode,
};
