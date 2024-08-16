interface IResponseData<T> {
  data?: Array<Nullable<T>>;
  count?: number;
  total?: number;
  page?: number;
  pageCount?: number;
  sort?: string;
}

export type ResponeData<T> = Nullable<IResponseData<T>>;
