import {
  type UseMutateFunction,
  useMutation,
  useQueryClient,
} from "react-query";
import { useNavigate } from "react-router-dom";
import { type AuthUser } from "interfaces/auth";
import * as userLocalStorage from "../../utils/user.localstore";
import { type AxiosError } from "axios";
import { type APIError } from "interfaces/error";
import { signIn } from "api/auth";
import { QUERY_KEY } from "constants/queryKeys";

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
  >(async ({ email, password }) => await signIn(email, password), { // サインインの非同期処理を行う関数を定義します。
    // サインインが成功した場合の処理を定義します。
    onSuccess: (data) => {
      if (data) {
        queryClient.setQueryData([QUERY_KEY.AUTH_USER], data);
        userLocalStorage.saveUser(data);
        // ユーザーをダッシュボードにリダイレクトします。
        navigate("/admin/dashboard");
      }
    },
    // サインインが失敗した場合の処理を定義します。
    onError: () => {},
  });

  return {
    mutateFn: signInMutation, // サインイン操作をトリガーする関数。
    isLoading, // サインイン操作の進行状況を示すフラグ。
    error: error?.response?.data ?? null, // エラーメッセージを保持します（エラーが存在しない場合は `null`）。
  };
};
