/* eslint-disable prettier/prettier */
import { Controller, UseGuards, Request, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './localauth.guard';
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() request: any) {
    return this.authService.login(request.user);
  }
}
