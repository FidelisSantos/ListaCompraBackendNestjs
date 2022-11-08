/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/repository/user.repository.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne(email);
    if (user && (await bcrypt.compare(password, user.password))) return user;
    else if (!user)
      throw new HttpException("Don't exits this email", HttpStatus.NOT_FOUND);
    else
      throw new HttpException(
        'Email or Password incorrect',
        HttpStatus.UNAUTHORIZED,
      );
  }

  async login(user: User) {
    console.log(user);
    const payload = { email: user.email, sub: user.id, role: user.role };

    return { acess_token: this.jwtService.sign(payload) };
  }
}
