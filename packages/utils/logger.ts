import { HttpError } from '$/utils/error';

// biome-ignore lint/suspicious/noExplicitAny: match native api
const log = (...args: any) => {
  if (import.meta.env.MODE !== 'development') {
    return;
  }

  console.log(...args);
};

// biome-ignore lint/suspicious/noExplicitAny: match native api
const warn = (...args: any) => {
  if (import.meta.env.MODE !== 'development') {
    return;
  }

  console.warn(...args);
};

// biome-ignore lint/suspicious/noExplicitAny: match native api
const error = (...args: any) => {
  if (import.meta.env.MODE !== 'development') {
    return;
  }

  console.error(...args);
};

const getErrorInstanceMessage = (err: Error): string => {
  if (err instanceof HttpError && err.context.jsonResponse?.error?.message) {
    return err.context.jsonResponse.error.message;
  }

  return err.message;
};

export const loggerUtils = {
  log,
  warn,
  error,
  getErrorInstanceMessage,
};
