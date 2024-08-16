import { useEffect } from "react";
import { useQuery } from "react-query";
import { type AuthUser } from "interfaces/auth";
import * as userLocalStorage from "../../utils/user.localstore";
import { getAuthUser } from "api/auth";
import { useNavigate } from "react-router-dom";
import { useQueryKey } from "hooks/useQueryKey";

/**
 * `useAuthUser` は、現在認証されているユーザーを取得および管理するためのカスタムフックです。
 *
 * このフックは、認証されたユーザーのデータを取得し、そのデータをローカルストレージに保存します。
 * ユーザーが認証されていない場合、ユーザーをログインページにリダイレクトします。
 *
 * @returns 現在認証されているユーザー (`AuthUser`) 、または `null` 。
 */
export const useAuthUser = (): NullOrUndefined<AuthUser> => {
  const navigate = useNavigate(); // ユーザーを別のページにリダイレクトするためのナビゲート関数
  const { authUser } = useQueryKey(); // クエリキーを取得するカスタムフック

  const { data: user } = useQuery<NullOrUndefined<AuthUser>>(
    [authUser], // クエリキーとして `authUser` を使用
    async (): Promise<NullOrUndefined<AuthUser>> => await getAuthUser(user), // 認証ユーザーを取得する非同期関数

    {
      refetchOnMount: true, // マウント時にデータを再取得
      refetchOnWindowFocus: false, // ウィンドウがフォーカスされたときに再取得しない
      refetchOnReconnect: false, // 再接続時にデータを再取得しない
      initialData: userLocalStorage.getUser, // 初期データとしてローカルストレージからユーザーを取得
      onError: () => {
        userLocalStorage.removeUser(); // エラー時にローカルストレージからユーザーを削除
        navigate("/login"); // ログインページにリダイレクト
      },
    }
  );

  // ユーザーが更新されたときの副作用を管理
  useEffect(() => {
    if (!user) userLocalStorage.removeUser();
    else userLocalStorage.saveUser(user);
  }, [user]);

  return user ?? null;
};
