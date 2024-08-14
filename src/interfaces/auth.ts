import { User } from "./user";

export interface AuthUser extends User {
  authToken: string;
}
