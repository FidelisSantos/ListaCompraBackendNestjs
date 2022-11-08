import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';
import { UserRole } from './user-role';
export class UserCreate {
  id: string;
  email: string;
  username: string;
  password: string;
  role: UserRole[];
  constructor(
    email: string,
    username: string,
    password: string,
    role: UserRole[],
  ) {
    this.id = randomUUID();
    this.email = email;
    this.username = username;
    this.password = bcrypt.hashSync(password, 10);
    this.role = role;
  }
}
