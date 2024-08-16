import {
  type UseMutateFunction,
  useMutation,
  useQueryClient,
} from "react-query";
import { useNavigate } from "react-router-dom";
import * as userLocalStorage from "../../utils/user.localstore";
import { useQueryKey } from "hooks/useQueryKey";

/**
 * `signOut` 関数は、サインアウト処理を実行する非同期関数です。
 *
 * ここではサーバーへのリクエストやセッションの無効化などのサインアウト処理が実行されます。
 * 現在の実装では、単にコンソールログを表示するだけです。
 */
const signOut = async () => {
  // console.log('signOut');
};

type IUseSignOut = UseMutateFunction<unknown>;

/**
 * `useSignOut` フックは、ユーザーのサインアウト操作を処理するためのカスタムフックです。
 *
 * このフックは、ユーザーをサインアウトさせ、クライアント側の認証状態をクリアし、
 * ログインページにリダイレクトするためのロジックを含んでいます。
 *
 * @returns `IUseSignOut` - サインアウト操作をトリガーするための関数。
 */
export const useSignOut = (): IUseSignOut => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { authUser } = useQueryKey();

  const { mutate: signOutMutation } = useMutation(
    async () => {
      await signOut();
    },
    {
      onSettled: () => {
        queryClient.setQueryData([authUser], null);
        userLocalStorage.removeUser();
        navigate("/login");
      },
      onError: (error) => {
        console.log(error);
        queryClient.setQueryData([authUser], null);
        userLocalStorage.removeUser();
      },
    }
  );

  return signOutMutation;
};
