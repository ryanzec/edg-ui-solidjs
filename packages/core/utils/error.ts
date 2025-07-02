export const DEFAULT_ERROR_MESSAGE = 'Something went wrong, please try again later.';

export const ErrorMessage = {
  UNAUTHENTICATED: 'unable to authenticate',
  UNKNOWN: 'An unknown error occurred',
} as const;

export type ErrorMessage = (typeof ErrorMessage)[keyof typeof ErrorMessage];
