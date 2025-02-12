import type { ResponseStructure } from '$/apis/utils';
import { HttpError } from '$/utils/error';
import { globalLogger } from '$api/utils/logger';
import { StytchError } from 'stytch';

const buildDataResponse = <TResponseData>(data: TResponseData): ResponseStructure<TResponseData> => {
  const response: ResponseStructure<TResponseData> = {};

  if (data) {
    response.data = data;
  }

  return response;
};

const buildErrorResponse = <TResponseData>(
  error: unknown,
  errorMessage = 'unknown error',
): ResponseStructure<TResponseData> => {
  globalLogger?.error(error);

  if (error instanceof StytchError) {
    return {
      error: {
        message: error.error_message,
      },
    };
  }

  if (error instanceof HttpError) {
    const errorMessage = error.context.jsonResponse?.error?.message ?? error.message;

    return {
      error: {
        message: errorMessage,
      },
    };
  }

  if (error instanceof Error) {
    return {
      error: {
        message: error.message,
      },
    };
  }

  return {
    error: {
      message: errorMessage,
    },
  };
};

const getErrorStatusCode = (error: unknown): number => {
  if (error instanceof StytchError) {
    return error.status_code || 500;
  }

  if (error instanceof HttpError) {
    return error.statusCode || 500;
  }

  return 500;
};

export const apiUtils = {
  buildDataResponse,
  buildErrorResponse,
  getErrorStatusCode,
};
