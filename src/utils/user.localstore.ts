import { type AuthUser } from 'interfaces/auth';

export const USER_LOCAL_STORAGE_KEY = 'AUTH-USER';

export const saveUser = (user: AuthUser): void => {
  /**
   * get the authToken from the localStorage and set it to the new user authToken.
   * Because whenever newAuthUser information is retrieved from backend with any api other than 'auth/login',
   * It does not return any authToken. So use the previosly stored authToken with newAuthUser information.
   */
  const localUser: NullOrUndefined<AuthUser> = getUser();
  if (localUser?.authToken) {
    user.authToken = localUser.authToken;
  }
  localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
};

export const getUser = (): NullOrUndefined<AuthUser> => {
  const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY);

  return user ? JSON.parse(user) : undefined;
};

export const removeUser = (): void => {
  localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
};
