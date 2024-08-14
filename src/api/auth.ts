import { ResponseError } from 'utils/error/ResponseError';
import axios, { authAxios } from 'utils/axios/axios-client';
import { type AuthUser } from 'interfaces/auth';
import { API_URL } from 'constants/apiUrls';

export const signIn = async (
  email: string,
  password: string,
): Promise<NullOrUndefined<AuthUser>> => {
  const response = await axios.post(API_URL.SIGN_IN, { email, password });
  if (!response.status)
    throw new ResponseError('Failed on sign in request', response.data);

  return response.data;
};

export const getAuthUser = async (
  user: NullOrUndefined<AuthUser>,
): Promise<NullOrUndefined<AuthUser>> => {
  if (!user) return null;
  const response = await authAxios.get(API_URL.AUTH_USER_INFO);
  if (!response.status)
    throw new ResponseError('Failed on sign in request', response.data);

  return response.data;
};
