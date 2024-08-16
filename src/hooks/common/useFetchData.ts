import { useQuery } from 'react-query';
import { type ResponeData } from 'interfaces/response';
import { type APIError } from 'interfaces/error';
import { type AxiosError } from 'axios';

const initialData = {
  data: [],
  count: 0,
  page: 1,
  pageCount: 0,
};

interface IUseFetchData<T> {
  apiData: ResponeData<T>;
  error: NullOrUndefined<APIError>;
  isFetching: boolean;
  isLoading: boolean;
  isError: boolean;
  refetch: unknown;
}

export const useFetchData = <T>(
  queryKey: string,
  apiUrl: string,
  apiFunction: <T>() => Promise<T>,
): IUseFetchData<T> => {
  const {
    data: apiData,
    error,
    isFetching,
    isLoading,
    isError,
    refetch,
  } = useQuery<ResponeData<T> | T, AxiosError>(
    [queryKey, apiUrl],
    async (): Promise<ResponeData<T> | T> => await apiFunction<T>(),
    {
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      initialData,
      onError: (error) => {
        console.log(error);
      },
    },
  );

  return {
    apiData: apiData ?? null,
    error: error?.response?.data ?? null,
    isFetching,
    isLoading,
    isError,
    refetch,
  };
};
