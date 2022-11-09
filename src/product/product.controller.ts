import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { Role } from '../auth/role.decorator';
import { RoleGuard } from 'src/auth/role/role.guard';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Role('USER')
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Req() req: any, @Body() products?: string[]) {
    return this.productService.create(
      new CreateProductDto(req.user.email, products),
    );
  }

  @Role('ADM')
  @Get('all')
  @UseGuards(JwtAuthGuard, RoleGuard)
  findAll() {
    return this.productService.findAll();
  }

  @Role('USER')
  @Get()
  @UseGuards(JwtAuthGuard)
  findOne(@Req() req: any) {
    return this.productService.findOne(req.user.email);
  }

  @Role('USER')
  @Patch()
  @UseGuards(JwtAuthGuard)
  async update(@Req() req: any, @Body() updateProductDto: UpdateProductDto) {
    return await this.productService.update(req.user.email, updateProductDto);
  }

  @Role('USER')
  @Delete()
  @UseGuards(JwtAuthGuard)
  remove(@Req() req: any) {
    return this.productService.remove(req.user.email);
  }
}
