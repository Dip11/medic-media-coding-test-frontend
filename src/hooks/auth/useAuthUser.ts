import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { QUERY_KEY } from 'constants/queryKeys';
import { type AuthUser } from 'interfaces/auth';
import * as userLocalStorage from '../../utils/user.localstore';
import { getAuthUser } from 'api/auth';
import { useNavigate } from 'react-router-dom';

export const useAuthUser = (): NullOrUndefined<AuthUser> => {
  const navigate = useNavigate();

  const { data: user } = useQuery<NullOrUndefined<AuthUser>>(
    [QUERY_KEY.auth_user],
    async (): Promise<NullOrUndefined<AuthUser>> => await getAuthUser(user),
    {
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      initialData: userLocalStorage.getUser,
      onError: () => {
        userLocalStorage.removeUser();
        navigate('/login');
      },
    },
  );

  useEffect(() => {
    if (!user) userLocalStorage.removeUser();
    else userLocalStorage.saveUser(user);
  }, [user]);

  return user ?? null;
};
