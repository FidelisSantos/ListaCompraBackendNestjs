import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FireormModule } from 'nestjs-fireorm';
import { User } from './entities/user.entity';
import { UserRepository } from './repository/user.repository.service';
import * as dotenv from 'dotenv';
import { ProductModule } from '../product/product.module';

dotenv.config();
@Module({
  imports: [FireormModule.forFeature([User]), ProductModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
