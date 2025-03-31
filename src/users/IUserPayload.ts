import { Roles } from './Roles';

export interface IUserPayload {
  id: number;
  username: string;
  role: Roles;
}
