import { useSubmit } from 'hooks/common/useSubmit';
import {
  apiDeleteMethod,
  apiPostMethod,
  apiPutMethod,
} from 'utils/axios/api-methods';
import { useQueryClient } from 'react-query';
import { ITask } from 'interfaces/task';
import { API_URL } from 'constants/apiUrls';
import { useQueryKey } from 'hooks/useQueryKey';

export const useSubmitTask = (defaultData?: NullOrUndefined<ITask>) => {  
  const queryClient = useQueryClient();
  const { tasks, task } = useQueryKey();
  const save = useSubmit<ITask, ITask>(
    async (data) => {
      const payloadData = data;
      const response = await apiPostMethod<ITask, ITask>(
        API_URL.TASKS,
        payloadData,
      );
      return response;
    },
    {
      successToastText: 'タスクが正常に追加されました。',
      onSuccess: () => {
        queryClient.invalidateQueries([tasks]);
      },
    },
  );

  const update = useSubmit<ITask, ITask>(
    async (data) => {
      const payloadData = data;
      const response = await apiPutMethod<ITask, ITask>(
        `${API_URL.TASKS}/${defaultData?.id}`,
        payloadData,
      );
      return response;
    },
    {
      successToastText: 'タスクが更新されました。',
      onSuccess: () => {
        queryClient.invalidateQueries([tasks]);
        queryClient.invalidateQueries([task(defaultData?.id)]);
      },
    },
  );
  const updateOrSave = defaultData?.id ? update : save;

  const deleteTask = useSubmit<ITask, ITask>(
    async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await apiDeleteMethod<any>(
        `${API_URL.TASKS}/${defaultData?.id}`,
      );
      return response;
    },
    {
      successToastText: 'タスクは削除されました。',
      onSuccess: () => {
        queryClient.invalidateQueries([task(defaultData?.id)]);
        queryClient.invalidateQueries([tasks]);
      },
    },
  );


  return {
    updateOrSave,
    deleteTask,
  };
};
