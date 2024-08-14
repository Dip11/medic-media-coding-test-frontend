import { AuthUser } from "interfaces/auth";

export type AuthCtx = {
  user: NullOrUndefined<AuthUser>;
  setUser(user: object | null): void;
  unsetUser(): void;
};
