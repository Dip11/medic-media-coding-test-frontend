import { useAuth } from 'providers/auth';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { WebRoutes } from 'routes/WebRoutes';

export function useHandle401() {
  const navigate = useNavigate();
  const { unsetUser } = useAuth();

  return useCallback(() => {
    unsetUser();
    navigate(WebRoutes.login.path, { state: { sessionExpired: true } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
