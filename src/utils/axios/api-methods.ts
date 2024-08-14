import { AxiosRequestConfig, type AxiosResponse } from 'axios';
import { authAxios } from './axios-client';
import { ResponseError } from 'utils/error/ResponseError';
import { setAndGetCommonParams } from 'utils/apiParamHelper';

export const apiGetMethod = async <T>(
  URL: string,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const API_URL = URL + setAndGetCommonParams();
  const response = await authAxios.get<any, AxiosResponse<T>>(API_URL, config);
  if (!response.status)
    throw new ResponseError(`Failed on ${URL} request`, response);

  return response.data;
};

export const apiPostMethod = async <Tresponse, TData>(
  URL: string,
  data: TData,
): Promise<Tresponse> => {
  const response = await authAxios.post<any, AxiosResponse<Tresponse>>(
    URL,
    data,
  );
  if (!response.status)
    throw new ResponseError(`Failed on ${URL} request`, response);

  return response.data;
};

export const apiPutMethod = async <Tresponse, TData>(
  URL: string,
  data: TData,
): Promise<Tresponse> => {
  const response = await authAxios.put<any, AxiosResponse<Tresponse>>(
    `${URL}`,
    data,
  );
  if (!response.status)
    throw new ResponseError(`Failed on ${URL} request`, response);

  return response.data;
};

export const apiPatchMethod = async <Tresponse, TData>(
  URL: string,
  data: TData,
): Promise<Tresponse> => {
  const response = await authAxios.patch<any, AxiosResponse<Tresponse>>(
    `${URL}`,
    data,
  );
  if (!response.status)
    throw new ResponseError(`Failed on ${URL} request`, response);

  return response.data;
};

export const apiDeleteMethod = async <Tresponse>(
  URL: string,
): Promise<Tresponse> => {
  const response = await authAxios.delete<any, AxiosResponse<Tresponse>>(
    `${URL}`,
  );
  if (!response.status)
    throw new ResponseError(`Failed on ${URL} request`, response);

  return response.data;
};
