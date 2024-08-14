export const saveItem = <T>(item: T, localStorageKey: string): void => {
  localStorage.setItem(localStorageKey, JSON.stringify(item));
};

export const getItem = <T>(localStorageKey: string): NullOrUndefined<T> => {
  const item = localStorage.getItem(localStorageKey);
  return item ? JSON.parse(item) : undefined;
};

export const removeItem = (localStorageKey: string): void => {
  localStorage.removeItem(localStorageKey);
};
