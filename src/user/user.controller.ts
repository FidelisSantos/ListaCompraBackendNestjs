import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { Role } from 'src/auth/role.decorator';
import { UserRole } from './types/user-role';
import { RoleGuard } from 'src/auth/role/role.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto, [UserRole.USER]);
  }

  @Role('OWNER')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('createadm')
  createAdm(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto, [
      UserRole.ADM,
      UserRole.USER,
    ]);
  }

  @Role('ADM')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('all')
  findAll() {
    return this.userService.findAll();
  }
  @Role('USER')
  @UseGuards(JwtAuthGuard)
  @Get()
  findOne(@Req() req: any) {
    return this.userService.findOne(req.user.email);
  }

  @Role('OWNER')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch('updatetoadm')
  updateToAdm(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateToAdmin(updateUserDto.email);
  }

  @Role('USER')
  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Req() req: any, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(req.user.email, updateUserDto);
  }

  @Role('USER')
  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Req() req: any) {
    return this.userService.remove(req.user.email);
  }
}
