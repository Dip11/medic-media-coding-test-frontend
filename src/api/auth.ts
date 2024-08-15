import { ResponseError } from "utils/error/ResponseError";
import axios, { authAxios } from "utils/axios/axios-client";
import { type AuthUser } from "interfaces/auth";
import { API_URL } from "constants/apiUrls";

/**
 * ユーザーをサインインさせるための非同期関数。
 *
 * この関数は、指定されたメールアドレスとパスワードを使用してサインインAPIエンドポイントにリクエストを送信し、
 * サーバーから認証されたユーザー情報を取得します。リクエストが成功すると、サーバーからのレスポンスデータが返されます。
 * リクエストが失敗した場合、エラーメッセージとともに `ResponseError` がスローされます。
 *
 * @param email - ユーザーのメールアドレス。
 * @param password - ユーザーのパスワード。
 * @returns 認証されたユーザー情報 (`AuthUser`)、または `null` 。
 * @throws ResponseError - サインインリクエストが失敗した場合にスローされます。
 */
export const signIn = async (
  email: string,
  password: string
): Promise<NullOrUndefined<AuthUser>> => {
  const response = await axios.post(API_URL.SIGN_IN, { email, password });
  if (!response.status)
    throw new ResponseError("サインインリクエストに失敗しました", response.data);

  return response.data;
};

/**
 * 現在認証されているユーザーの情報を取得する非同期関数。
 *
 * この関数は、サインイン済みのユーザーが存在するかどうかを確認し、存在する場合は、
 * サーバーから追加のユーザー情報を取得します。サインイン済みユーザーが存在しない場合、
 * `null` を返します。リクエストが失敗した場合、エラーメッセージとともに `ResponseError` がスローされます。
 *
 * @param user - 現在の認証済みユーザー情報、または `null` 。
 * @returns 追加の認証済みユーザー情報 (`AuthUser`)、または `null` 。
 * @throws ResponseError - ユーザー情報取得リクエストが失敗した場合にスローされます。
 */
export const getAuthUser = async (
  user: NullOrUndefined<AuthUser>
): Promise<NullOrUndefined<AuthUser>> => {
  if (!user) return null;
  const response = await authAxios.get(API_URL.AUTH_USER_INFO);
  if (!response.status)
    throw new ResponseError("サインインリクエストに失敗しました", response.data);

  return response.data;
};
