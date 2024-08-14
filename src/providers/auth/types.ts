import { User } from 'utils/api/types/User';

export type AuthCtx = {
  user: NullOrUndefined<User>;
  setUser(user: object | null): void;
  unsetUser(): void;
};
