import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductRepository } from './repository/product.repository.service';
import { ViewProduct } from './types/product.view';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}
  async create(createProductDto: CreateProductDto) {
    try {
      const userProduct = await this.productRepository.findOne(
        createProductDto.id,
      );
      if (userProduct)
        throw new HttpException('User exists', HttpStatus.BAD_REQUEST);
      const products = await this.productRepository.create(createProductDto);
      const viewProduct = new ViewProduct(products.Produto);
      return viewProduct;
    } catch {
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      return await this.productRepository.findAll();
    } catch {
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string) {
    try {
      const products = await this.productRepository.findOne(id);
      const viewProduct = new ViewProduct(products.Produto);
      return viewProduct;
    } catch (error) {
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const products = await this.productRepository.findOne(id);
      if (!products)
        throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);

      products.Produto = updateProductDto.Produto;
      await this.productRepository.update(products);
      const viewProduct = new ViewProduct(products.Produto);
      return viewProduct;
    } catch (error) {
      throw new HttpException('Internal Error', HttpStatus.UNAUTHORIZED);
    }
  }

  async remove(id: string) {
    const products = await this.productRepository.findOne(id);
    if (!products)
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    try {
      products.Produto = [];
      await this.productRepository.update(products);
    } catch (error) {
      throw new HttpException('Internal Error', HttpStatus.UNAUTHORIZED);
    }
  }
}
