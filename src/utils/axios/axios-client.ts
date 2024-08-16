import axios, {
  type AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import * as userLocalStorage from "utils/user.localstore";
import { type AuthUser } from "interfaces/auth";

const BASE_PATH = import.meta.env.VITE_API_PATH;

// デフォルトの Axios インスタンスを作成し、基本パスを設定します。
export default axios.create({ baseURL: BASE_PATH });

/**
 * `authAxios` は、認証が必要なAPIリクエストのための Axios インスタンスです。
 *
 * - `baseURL`: APIのベースパスを指定します。
 * - `headers`: デフォルトのヘッダーとして `Content-Type: application/json` を設定します。
 * - `withCredentials`: 認証情報が必要なリクエストに対して、クッキーなどの資格情報を含める設定。ここでは `false` に設定しています。
 */
export const authAxios = axios.create({
  baseURL: BASE_PATH,
  headers: { "Content-Type": "application/json" },
  withCredentials: false,
});

/**
 * リクエストインターセプターを設定し、APIリクエストの前に認証トークンをヘッダーに追加します。
 *
 * - `config.headers`: ヘッダーが存在する場合、ローカルストレージからユーザー情報を取得し、
 *   `Authorization` ヘッダーに `Bearer` トークンを追加します。
 *
 * @param config - リクエスト設定オブジェクト。
 * @returns 修正されたリクエスト設定オブジェクト。
 */
authAxios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (config.headers !== undefined) {
    const user: NullOrUndefined<AuthUser> = userLocalStorage.getUser();
    if (user) {
      config.headers.Authorization = `Bearer ${user.authToken}`;
    }
  }

  return config;
});

/**
 * レスポンスインターセプターを設定し、APIレスポンスの処理をカスタマイズします。
 *
 * - `response`: 成功したレスポンスをそのまま返します。
 * - `error`: レスポンスエラーが発生した場合にエラーハンドリングを行います。
 *   - 401 エラーの場合: 認証が失敗したことを示します。ここでは具体的な処理は行っていません。
 *   - その他のエラー: エラーをそのままリジェクトして、呼び出し元に伝達します。
 *
 * @param response - APIからのレスポンスオブジェクト。
 * @param error - エラーレスポンスオブジェクト。
 * @returns 成功したレスポンスまたはリジェクトされたエラー。
 */
authAxios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    switch (error.response?.status) {
      case 401:
        break;
      default:
        break;
    }

    return await Promise.reject(error);
  }
);
