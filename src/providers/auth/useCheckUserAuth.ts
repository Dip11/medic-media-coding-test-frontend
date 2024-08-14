import { AuthUser } from 'interfaces/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { WebRoutes } from 'routes/WebRoutes';

/**
 * Checks if user has access to current path
 * otherwise, directs to /
 * @param user User
 */
export function useCheckUserAuth(user: NullOrUndefined<AuthUser>) {
  const noAccess = !user;
  const navigate = useNavigate();

  useEffect(() => {
    if (noAccess) {
      navigate(WebRoutes.login.path);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noAccess, user]);
}
