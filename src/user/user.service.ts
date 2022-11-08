import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repository/user.repository.service';
import * as dotenv from 'dotenv';
import { UserCreate } from './types/user.create';
import { ViewUser } from './types/user.view';
import { UserRole } from './types/user-role';
import * as bcrypt from 'bcrypt';
import { ProductRepository } from '../product/repository/product.repository.service';
import { CreateProductDto } from '../product/dto/create-product.dto';

dotenv.config();
@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly productRepository: ProductRepository,
  ) {}
  async create(createUserDto: CreateUserDto, role: UserRole[]) {
    try {
      if (await this.userRepository.exists(createUserDto.email)) {
        const newUser = new UserCreate(
          createUserDto.email,
          createUserDto.username,
          createUserDto.password,
          role,
        );
        await this.userRepository.create(newUser);
        return new ViewUser(newUser.id, newUser.username);
      }
      throw new HttpException('Email exists', HttpStatus.BAD_REQUEST);
    } catch (error) {
      throw new HttpException(
        'Internal Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      return await this.userRepository.findAll();
    } catch (error) {
      throw new HttpException(
        'Internal Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(email: string) {
    try {
      return await this.userRepository.findOne(email);
    } catch (error) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async update(email: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOne(email);

      if (user) {
        if (email != updateUserDto.email && updateUserDto.email) {
          if (await this.userRepository.exists(updateUserDto.email)) {
            user.email = updateUserDto.email;
            const products = await this.productRepository.findOne(email);
            if (products) {
              const userProducts = products.Produto;
              await this.productRepository.removeUser(email);
              await this.productRepository.create(
                new CreateProductDto(updateUserDto.email, userProducts),
              );
            }
          } else
            throw new HttpException('Email exists', HttpStatus.BAD_REQUEST);
        }
      } else throw new HttpException('User NotFound', HttpStatus.NOT_FOUND);
      if (updateUserDto.username) user.username = updateUserDto.username;
      if (updateUserDto.password)
        user.password = await bcrypt.hash(updateUserDto.password, 10);
      await this.userRepository.update(user);
    } catch (error) {
      throw new HttpException(
        'Internal Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async updateToAdmin(email: string) {
    try {
      const user = await this.userRepository.findOne(email);
      if (!user)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      user.role.push(UserRole.ADM);
      await this.userRepository.update(user);
    } catch {
      throw new HttpException(
        'Internal Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(email: string) {
    try {
      const user = await this.userRepository.findOne(email);
      if (!user)
        throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);

      await this.userRepository.remove(user.id);
      await this.productRepository.removeUser(email);
    } catch (error) {
      throw new HttpException(
        'Internal Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
