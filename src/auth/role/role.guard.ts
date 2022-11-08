import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserValidate } from '../types/user-validate';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const role = this.reflector.get('role', context.getHandler());
    if (!role) {
      return true;
    }
    const request: UserValidate = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(user);
    return user.role.find((userRole) => userRole == role) ? true : false;
  }
}
