import { AxiosRequestConfig, type AxiosResponse } from 'axios';
import { authAxios } from './axios-client';
import { ResponseError } from 'utils/error/ResponseError';
import { setAndGetCommonParams } from 'utils/apiParamHelper';



/**
 * `apiGetMethod` 関数は、GETリクエストを行い、指定されたURLからデータを取得します。
 * 
 * @template T - レスポンスデータの型。
 * @param URL - データを取得するエンドポイントのURL。
 * @param config - オプションのAxiosリクエスト設定。
 * @returns 取得されたデータを含む `Promise<T>` 。
 * @throws ResponseError - リクエストが失敗した場合にスローされます。
 */
export const apiGetMethod = async <T>(
  URL: string,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const API_URL = URL + setAndGetCommonParams(); // 共通のパラメータを追加したURLを構築
  const response = await authAxios.get<unknown, AxiosResponse<T>>(API_URL, config);
  if (!response.status)
    throw new ResponseError(`Failed on ${URL} request`, response);

  return response.data; // レスポンスデータを返す
};



/**
 * `apiPostMethod` 関数は、POSTリクエストを行い、指定されたURLにデータを送信します。
 * 
 * @template Tresponse - レスポンスデータの型。
 * @template TData - 送信するデータの型。
 * @param URL - データを送信するエンドポイントのURL。
 * @param data - 送信するデータ。
 * @returns レスポンスデータを含む `Promise<Tresponse>` 。
 * @throws ResponseError - リクエストが失敗した場合にスローされます。
 */
export const apiPostMethod = async <Tresponse, TData>(
  URL: string,
  data: TData,
): Promise<Tresponse> => {
  const response = await authAxios.post<unknown, AxiosResponse<Tresponse>>(
    URL,
    data,
  );
  if (!response.status)
    throw new ResponseError(`Failed on ${URL} request`, response);

  return response.data; // レスポンスデータを返す
};



/**
 * `apiPutMethod` 関数は、PUTリクエストを行い、指定されたURLにデータを送信してリソースを更新します。
 * 
 * @template Tresponse - レスポンスデータの型。
 * @template TData - 送信するデータの型。
 * @param URL - リソースを更新するエンドポイントのURL。
 * @param data - 更新するデータ。
 * @returns 更新されたリソースを含む `Promise<Tresponse>` 。
 * @throws ResponseError - リクエストが失敗した場合にスローされます。
 */
export const apiPutMethod = async <Tresponse, TData>(
  URL: string,
  data: TData,
): Promise<Tresponse> => {
  const response = await authAxios.put<unknown, AxiosResponse<Tresponse>>(
    `${URL}`,
    data,
  );
  if (!response.status)
    throw new ResponseError(`Failed on ${URL} request`, response);

  return response.data; // 更新されたリソースを返す
};



/**
 * `apiPatchMethod` 関数は、PATCHリクエストを行い、指定されたURLにデータを送信してリソースを部分更新します。
 * 
 * @template Tresponse - レスポンスデータの型。
 * @template TData - 送信するデータの型。
 * @param URL - リソースを部分更新するエンドポイントのURL。
 * @param data - 部分更新するデータ。
 * @returns 更新されたリソースを含む `Promise<Tresponse>` 。
 * @throws ResponseError - リクエストが失敗した場合にスローされます。
 */
export const apiPatchMethod = async <Tresponse, TData>(
  URL: string,
  data: TData,
): Promise<Tresponse> => {
  const response = await authAxios.patch<unknown, AxiosResponse<Tresponse>>(
    `${URL}`,
    data,
  );
  if (!response.status)
    throw new ResponseError(`Failed on ${URL} request`, response);

  return response.data; // 更新されたリソースを返す
};


/**
 * `apiDeleteMethod` 関数は、DELETEリクエストを行い、指定されたURLからリソースを削除します。
 * 
 * @template Tresponse - レスポンスデータの型。
 * @param URL - リソースを削除するエンドポイントのURL。
 * @returns 削除結果を含む `Promise<Tresponse>` 。
 * @throws ResponseError - リクエストが失敗した場合にスローされます。
 */
export const apiDeleteMethod = async <Tresponse>(
  URL: string,
): Promise<Tresponse> => {
  const response = await authAxios.delete<unknown, AxiosResponse<Tresponse>>(
    `${URL}`,
  );
  if (!response.status)
    throw new ResponseError(`Failed on ${URL} request`, response);

  return response.data;  // 削除結果を返す
};
