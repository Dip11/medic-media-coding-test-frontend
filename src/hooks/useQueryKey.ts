import { useMemo } from 'react';

export const useQueryKey = () => {
  return useMemo(
    () => ({
      authUser: "auth_user",
      tasks: `tasks`,
      task: (id?: string | number) => `tasks/${id}`,
    }),
    [],
  );
};
