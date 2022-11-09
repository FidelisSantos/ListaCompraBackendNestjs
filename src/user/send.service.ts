import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { UserRepository } from './repository/user.repository.service';

dotenv.config();
@Injectable()
export class SendService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly userRespository: UserRepository,
  ) {}

  async sendEmailForgotPassword(email: string) {
    try {
      const user = await this.userRespository.exists(email);
      console.log(process.env.USER_MAILER);
      if (!user) throw new HttpException('User NotFound', HttpStatus.NOT_FOUND);
      const envio = await this.mailerService.sendMail({
        to: email,
        from: process.env.USER_MAILER,
        subject: 'Deu Boa envio de email',
        replyTo: 'noreply',
        html: '<strong style="color: red"> Deu certo, comemore</strong>',
      });
    } catch (error) {
      throw new HttpException(
        'Internal Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
