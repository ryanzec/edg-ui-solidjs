import type { ResponseStructure } from '$/core/types/api';
import { HttpError } from '$/core/utils/http';
import { globalLogger } from '$api/utils/logger';

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
