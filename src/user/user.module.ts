import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FireormModule } from 'nestjs-fireorm';
import { User } from './entities/user.entity';
import { UserRepository } from './repository/user.repository.service';
import * as dotenv from 'dotenv';
import { ProductModule } from '../product/product.module';
import { SendService } from './send.service';
import { MailerModule } from '@nestjs-modules/mailer';

dotenv.config();
@Module({
  imports: [
    FireormModule.forFeature([User]),
    ProductModule,
    MailerModule.forRoot({
      transport: {
        service: 'Gmail',
        host: process.env.MAILER_HOST,
        secure: false,
        port: 425,
        auth: {
          user: process.env.USER_MAILER,
          pass: process.env.PASSWORD_MAILER,
        },
        ignoreTLS: true,
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, SendService],
  exports: [UserRepository],
})
export class UserModule {}
