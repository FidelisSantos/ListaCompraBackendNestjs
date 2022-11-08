import * as dotenv from 'dotenv';
import { Collection } from 'fireorm';
import { UserRole } from '../types/user-role';

dotenv.config();
@Collection(process.env.FIRESTORE_COLLECTION_USERS)
export class User {
  id: string;
  email: string;
  username: string;
  password: string;
  role: UserRole[];
}
