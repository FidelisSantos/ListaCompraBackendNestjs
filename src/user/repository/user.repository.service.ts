import { Injectable } from '@nestjs/common';
import { InjectRepository } from 'nestjs-fireorm';
import { BaseFirestoreRepository } from 'fireorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private users: BaseFirestoreRepository<User>,
  ) {}

  async create(createUser: User) {
    await this.users.create(createUser);
  }

  async findAll() {
    return await this.users.find();
  }

  async findOne(email: string) {
    return await this.users.whereEqualTo('email', email).findOne();
  }

  async update(updateUser: User) {
    return await this.users.update(updateUser);
  }

  async remove(id: string) {
    return await this.users.delete(id);
  }

  async exists(email: string) {
    const result = await this.users.whereEqualTo('email', email).find();
    return result.length === 0;
  }
}
