import type {
  InfiniteData,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/solid-query';
import type { QueryKey } from '$/application/utils/application';

// generic type for tanstack query options to reduce verbosity in api implementations
export type QueryOptionsType<
  TData,
  TKey extends (string | string[]) | [(typeof QueryKey)[keyof typeof QueryKey], ...unknown[]],
> = Partial<UseQueryOptions<TData, Error, TData, TKey extends string ? [TKey] : TKey>>;

// generic type for tanstack query result to reduce verbosity in api implementations
export type QueryResultTuple<TResponse, TDataType, TMetaData = unknown> =
  | [UseQueryResult<TResponse, Error>, () => TDataType | undefined]
  | [UseQueryResult<TResponse, Error>, () => TDataType | undefined, () => TMetaData | undefined];

export type InfiniteQueryResultTuple<TResponse, TDataType, TMetaData = unknown> = [
  UseInfiniteQueryResult<InfiniteData<TResponse>, Error>,
  () => TDataType[] | undefined,
];

export type InfiniteQueryOptionsType<
  TData,
  TKey extends (string | string[]) | [(typeof QueryKey)[keyof typeof QueryKey], ...unknown[]],
> = Partial<UseInfiniteQueryOptions<TData, Error, TData, TKey extends string ? [TKey] : TKey>>;
