import { IBase } from './IBase';

export interface User extends IBase {
  email: string;
  firstName: string;
  lastName: string;
}
