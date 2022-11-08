import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { FireormModule } from 'nestjs-fireorm';
import { Product } from './entities/product.entity';
import { ProductRepository } from './repository/product.repository.service';

@Module({
  imports: [FireormModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
  exports: [ProductRepository],
})
export class ProductModule {}
