import { AxiosError } from 'axios';

export type ReqConfig = Omit<RequestInit, 'body'> & {
  body?: RequestInit['body'] | object;
};

export type ReqHeaders = {
  'Content-Type'?: string;
  Authorization: string;
};

export type ApiErr = AxiosError<unknown, any>;
