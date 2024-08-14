import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import { useCheckUserAuth } from './useCheckUserAuth';
import { AuthCtx } from './types';
import * as userLocalStorage from 'utils/user.localstore';
import { AuthUser } from 'interfaces/auth';

const Auth = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const storage = userLocalStorage;
  const [user, setAuthUser] = useState<AuthUser | NullOrUndefined<AuthUser>>(() => {
    return storage.getUser();
  });

  useCheckUserAuth(user);

  const setUser = useCallback(
    (newUser: AuthUser) => {
      setAuthUser(newUser);
      storage.saveUser(newUser);
    },
    [storage],
  );

  const unsetUser = useCallback(() => {
    setAuthUser(null);
    storage.removeUser();
  }, [storage]);

  return (
    <Auth.Provider value={{ user, setUser, unsetUser }}>
      {children}
    </Auth.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(Auth);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export const useUser = () => {
  const context = useContext(Auth);
  if (context === null) {
    throw new Error('useUser must be used within an AuthProvider');
  }

  return context?.user;
};
