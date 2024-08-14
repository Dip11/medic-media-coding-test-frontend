import axios, {
  type AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import * as userLocalStorage from 'utils/user.localstore';
import { type AuthUser } from 'interfaces/auth';

const BASE_PATH = import.meta.env.VITE_API_PATH;

export default axios.create({ baseURL: BASE_PATH });

export const authAxios = axios.create({
  baseURL: BASE_PATH,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false,
});

authAxios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (config.headers !== undefined) {
    const user: NullOrUndefined<AuthUser> = userLocalStorage.getUser();
    if (user) {
      config.headers.Authorization = `Bearer ${user.authToken}`;
    }
  }

  return config;
});

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
  },
);
