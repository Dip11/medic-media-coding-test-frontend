import {
  type UseMutateFunction,
  useMutation,
  useQueryClient,
} from 'react-query';
import { useNavigate } from 'react-router-dom';
import { QUERY_KEY } from 'constants/queryKeys';
import * as userLocalStorage from '../../utils/user.localstore';

const signOut = async () => {
  // console.log('signOut');
};

type IUseSignOut = UseMutateFunction<unknown>;

export const useSignOut = (): IUseSignOut => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signOutMutation } = useMutation(
    async () => {
      await signOut();
    },
    {
      onSettled: () => {
        queryClient.setQueryData([QUERY_KEY.auth_user], null);
        userLocalStorage.removeUser();
        navigate('/login');
      },
      onError: (error) => {
        console.log(error);
        queryClient.setQueryData([QUERY_KEY.auth_user], null);
        userLocalStorage.removeUser();
      },
    },
  );

  return signOutMutation;
};
