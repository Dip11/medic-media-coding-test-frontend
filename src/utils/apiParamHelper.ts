interface IAPIParam {
  page?: number;
  limit?: number;
  sort?: string;
  sortDir?: string;
  filters?: string[];
}

export const setAndGetCommonParams = (filterParam?: IAPIParam) => {
  let url = '';
  if (filterParam) {
    const { page, limit, sort, sortDir, filters } = filterParam;

    if (page && limit) {
      url += `page=${page}&limit=${limit}`;
    }

    if (sort && sortDir) {
      url += `&sort=${sort},${sortDir}`;
    }

    if (filters) {
      url += filters.join('&');
    }
  }

  return url;
};
