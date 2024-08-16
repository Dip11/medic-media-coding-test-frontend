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
import { useQueryKey } from "hooks/useQueryKey";

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

/**
 * `useSignIn` は、ユーザーのサインイン操作を処理するためのカスタムフックです。
 * 
 * このフックは、認証情報を送信してユーザーをサインインさせ、成功した場合には
 * ユーザー情報をローカルストレージに保存し、ダッシュボードページにリダイレクトします。
 * 
 * @returns `IUseSignIn` オブジェクト - サインイン操作を管理するための関数と状態。
 */
export const useSignIn = (): IUseSignIn => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { authUser} = useQueryKey()

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
        queryClient.setQueryData([authUser], data);
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
