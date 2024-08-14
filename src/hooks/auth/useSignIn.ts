import {
  type UseMutateFunction,
  useMutation,
  useQueryClient,
} from 'react-query';
import { useNavigate } from 'react-router-dom';
import { type AuthUser } from 'interfaces/auth';
import * as userLocalStorage from '../../utils/user.localstore';
import { type AxiosError } from 'axios';
import { type APIError } from 'interfaces/error';
import { signIn } from 'api/auth';
import { QUERY_KEY } from 'constants/queryKeys';

interface IUseSignIn {
  mutateFn: UseMutateFunction<
    NullOrUndefined<AuthUser>,
    AxiosError,
    {
      email: string;
      password: string;
    },
    unknown
  >;
  isLoading: boolean;
  error: NullOrUndefined<APIError>;
}

export const useSignIn = (): IUseSignIn => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: signInMutation,
    isLoading,
    error,
  } = useMutation<
    NullOrUndefined<AuthUser>,
    AxiosError,
    { email: string; password: string },
    unknown
  >(async ({ email, password }) => await signIn(email, password), {
    onSuccess: (data) => {
      if (data) {
        queryClient.setQueryData([QUERY_KEY.auth_user], data);
        userLocalStorage.saveUser(data);
        navigate('/admin');
      }
    },
    onError: () => {},
  });

  return {
    mutateFn: signInMutation,
    isLoading,
    error: error?.response?.data ?? null,
  };
};
