/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type QueryFunction,
  type QueryKey,
  type UseQueryOptions,
} from 'react-query';
import { ApiErr } from 'utils/api/types/ApiErr';

export type UseFetchRecordsProps<T = any> = UseQueryOptions<T> & {
  url?: string;
  toastOnError?: boolean;
  queryKey?: QueryKey;
  queryFn?: QueryFunction<T, QueryKey>;
};

export type UseSubmitProps<TData, TVariables, TContext = any> = {
  url?: string;
  successToastText?: string;
  toastOnError?: boolean;
  onSuccess?: (
    data: TData,
    variables: TVariables,
    context: unknown,
  ) => void | Promise<unknown>;
  onError?: (
    error: ApiErr,
    variables: TVariables,
    context?: TContext,
  ) => void | Promise<unknown>;
  onSettled?: (
    data: TData | undefined,
    error: ApiErr | null,
    variables: TVariables,
    context?: TContext,
  ) => void | Promise<unknown>;
  onMutate?: (
    variables: TVariables,
  ) => Promise<any> | Promise<undefined> | any | undefined;
};
