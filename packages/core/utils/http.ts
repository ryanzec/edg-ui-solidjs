export const HttpStatusCode = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  RATE_LIMITED: 429,
  INTERNAL_ERROR: 500,
} as const;

export type HttpStatusCode = (typeof HttpStatusCode)[keyof typeof HttpStatusCode];
export const httpStatusCodeMessage: Record<HttpStatusCode, string> = {
  [HttpStatusCode.BAD_REQUEST]: 'Bad Request',
  [HttpStatusCode.UNAUTHORIZED]: 'Unauthorized',
  [HttpStatusCode.FORBIDDEN]: 'Forbidden',
  [HttpStatusCode.NOT_FOUND]: 'Not Found',
  [HttpStatusCode.RATE_LIMITED]: 'Too Many Requests',
  [HttpStatusCode.INTERNAL_ERROR]: 'Unknown Error Occurred',
};

export type HttpErrorContext = {
  // biome-ignore lint/suspicious/noExplicitAny: this can be able data so it needs to support any
  jsonResponse?: Record<string, any>;

  // biome-ignore lint/suspicious/noExplicitAny: this can be able data so it needs to support any
  [key: string]: any;
};

export type HttpErrorOptions = {
  message?: string;
  context?: HttpErrorContext;
};

// using a class here as it seems to be standard practice for errors
export class HttpError extends Error {
  statusCode: number;

  context: HttpErrorContext;

  constructor(statusCode: HttpStatusCode, options: HttpErrorOptions = {}) {
    super(options.message ?? httpStatusCodeMessage[statusCode]);

    this.statusCode = statusCode;
    this.context = options.context ?? {};
  }
}

export const AbortReason = {
  UNKNOWN: 'unknown',
  NEWER_REQUEST: 'newer_request',
} as const;

export type AbortReason = (typeof AbortReason)[keyof typeof AbortReason];

export class HttpAbortError extends Error {
  reason: AbortReason;

  constructor(message = 'Aborted request', reason: AbortReason = AbortReason.UNKNOWN) {
    super(message);

    this.name = 'HttpAbortError';
    this.reason = reason;
  }
}

export const HttpParseType = {
  JSON: 'json',
  NONE: 'none',
} as const;

export type HttpParseType = (typeof HttpParseType)[keyof typeof HttpParseType];

export type HttpRequest<TResponse> = Omit<RequestInit, 'credentials'> & {
  withCredentials?: boolean;
  // biome-ignore lint/suspicious/noExplicitAny: since this for an api request which can basically have any data, any is valid in this case
  payload?: Record<string, any>;

  urlSearchParams?: URLSearchParams;

  // should return false to prevent further processing of the error
  onError?: (response: Response, responseJson: TResponse) => Promise<boolean>;
  parseType?: HttpParseType;
};

export type GraphqlRequest<T, K = undefined> = Omit<RequestInit, 'credentials'> & {
  query: string;
  variables?: K;
  withCredentials?: boolean;

  // should return false to prevent further processing of the error
  onError?: (response: Response, responseJson: T) => Promise<boolean>;
};

export const GraphqlErrorCode = {
  AUTH_NOT_AUTHORIZED: 'AUTH_NOT_AUTHORIZED',
} as const;

export type GraphqlErrorCode = (typeof GraphqlErrorCode)[keyof typeof GraphqlErrorCode];

export const HttpMethod = {
  CONNECT: 'CONNECT',
  DELETE: 'DELETE',
  GET: 'GET',
  HEAD: 'HEAD',
  OPTIONS: 'OPTIONS',
  PATCH: 'PATCH',
  POST: 'POST',
  PUT: 'PUT',
  TRACE: 'TRACE',
} as const;

export type HttpMethod = (typeof HttpMethod)[keyof typeof HttpMethod];

let httpRequestInterceptors: Array<
  // biome-ignore lint/suspicious/noExplicitAny: this handles generic requests so it needs to allow for any
  (requestOptions: HttpRequest<any>) => HttpRequest<any> | Promise<HttpRequest<any>>
> = [];
let httpResponseInterceptors: Array<
  // biome-ignore lint/suspicious/noExplicitAny: this handles generic requests so it needs to allow for any
  (requestOptions: HttpRequest<any>, response: any, rawResponse: Response) => any | Promise<any>
> = [];

const addHttpRequestInterceptor = <TResponse>(
  // biome-ignore lint/suspicious/noExplicitAny: this handles generic requests so it needs to allow for any
  interceptor: (requestOptions: HttpRequest<any>) => HttpRequest<TResponse> | Promise<HttpRequest<TResponse>>,
) => {
  httpRequestInterceptors = httpRequestInterceptors.filter((currentInterceptor) => currentInterceptor !== interceptor);
};

const removeHttpRequestInterceptor = <TResponse>(
  // biome-ignore lint/suspicious/noExplicitAny: this handles generic requests so it needs to allow for any
  interceptor: (requestOptions: HttpRequest<any>) => HttpRequest<TResponse> | Promise<HttpRequest<TResponse>>,
) => {
  httpRequestInterceptors.push(interceptor);
};

const processRequestInterceptors = async <TResponse>(
  requestOptions: HttpRequest<TResponse>,
): Promise<HttpRequest<TResponse>> => {
  if (httpRequestInterceptors.length === 0) {
    return requestOptions;
  }

  let modifiedRequestOptions = requestOptions;

  for (let i = 0; i < httpRequestInterceptors.length; i++) {
    modifiedRequestOptions = await httpRequestInterceptors[i](modifiedRequestOptions);
  }

  return modifiedRequestOptions;
};

const addHttpResponseInterceptor = <TResponse>(
  interceptor: (
    // biome-ignore lint/suspicious/noExplicitAny: his handles generic requests so it needs to allow for any
    requestOptions: HttpRequest<any>,
    // biome-ignore lint/suspicious/noExplicitAny: his handles generic requests so it needs to allow for any
    response: any,
    rawResponse: Response,
  ) => TResponse | Promise<TResponse>,
) => {
  httpResponseInterceptors.push(interceptor);
};

const removeHttpResponseInterceptor = <TResponse>(
  interceptor: (
    // biome-ignore lint/suspicious/noExplicitAny: his handles generic requests so it needs to allow for any
    requestOptions: HttpRequest<any>,
    // biome-ignore lint/suspicious/noExplicitAny: this handles generic requests so it needs to allow for any
    response: any,
    rawResponse: Response,
  ) => TResponse | Promise<TResponse>,
) => {
  httpResponseInterceptors = httpResponseInterceptors.filter(
    (currentInterceptor) => currentInterceptor !== interceptor,
  );
};

const processResponseInterceptors = async <TResponse>(
  requestOptions: HttpRequest<TResponse>,
  response: TResponse,
  rawResponse: Response,
): Promise<TResponse> => {
  if (httpResponseInterceptors.length === 0) {
    return response;
  }

  let modifiedResponse = response;

  for (let i = 0; i < httpResponseInterceptors.length; i++) {
    modifiedResponse = await httpResponseInterceptors[i](requestOptions, modifiedResponse, rawResponse);
  }

  return modifiedResponse;
};

const http = async <TResponse extends object>(
  url: string,
  requestOptions: HttpRequest<TResponse> = {},
): Promise<TResponse> => {
  const finalRequestOptions = await processRequestInterceptors(requestOptions);
  const {
    withCredentials,
    payload,
    headers,
    onError,
    parseType = HttpParseType.JSON,
    ...defaultOptions
  } = finalRequestOptions;

  const fetchOptions: RequestInit = {
    ...defaultOptions,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    credentials: withCredentials !== false ? 'include' : 'same-origin',
    mode: 'cors',
  };

  if (payload) {
    fetchOptions.body = JSON.stringify(payload);
  }

  const finalUrl = requestOptions.urlSearchParams ? `${url}?${requestOptions.urlSearchParams.toString()}` : url;
  const response = await fetch(finalUrl, fetchOptions);
  const hasContent =
    response.headers.has('Content-Length') && Number.parseInt(response.headers.get('Content-Length') ?? '0') > 0;

  let finalJsonResponse: TResponse = {} as TResponse;
  let rawResponseText = '';

  if (hasContent && parseType === HttpParseType.JSON) {
    let jsonResponse: TResponse;

    try {
      // we want to process as text first so that if the response is not json, we can throw an error with the raw
      // response
      rawResponseText = await response.text();

      jsonResponse = JSON.parse(rawResponseText);
    } catch (error) {
      throw new HttpError(response.status as HttpStatusCode, {
        message: `failed to parse response as json: ${rawResponseText}`,
        context: {
          url: finalUrl,
          requestOptions,
          rawResponse: rawResponseText,
        },
      });
    }

    finalJsonResponse = await processResponseInterceptors(finalRequestOptions, jsonResponse, response);
  }

  if (!response.ok) {
    let throwError = true;

    if (onError) {
      throwError = await onError(response, finalJsonResponse);
    }

    if (throwError) {
      throw new HttpError(response.status as HttpStatusCode, {
        message: `http request failed with: ${response.status} ${response.statusText}`,
        context: {
          url: finalUrl,
          requestOptions,
          jsonResponse: finalJsonResponse,
        },
      });
    }
  }

  return finalJsonResponse;
};

export const httpUtils = {
  http,
  addHttpRequestInterceptor,
  addHttpResponseInterceptor,
  removeHttpRequestInterceptor,
  removeHttpResponseInterceptor,
};
