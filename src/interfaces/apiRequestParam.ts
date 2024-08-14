export interface IAPIRequestParam {
  page?: number;
  limit?: number;
  sort?: string;
  sortDir?: string;
  filters?: string[];
}

export interface IApiGetMethodParam {
  URL: string;
  param?: IAPIRequestParam;
}

export interface IApiPostMethodParam<T> {
  URL: string;
  data?: T;
}

export interface IApiPutMethodParam<T> {
  URL: string;
  data?: T;
}

export interface IApiDeleteMethodParam {
  URL: string;
}
