import { BaseFirestoreRepository } from 'fireorm';
import { Product } from '../entities/product.entity';
import { InjectRepository } from 'nestjs-fireorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private product: BaseFirestoreRepository<Product>,
  ) {}
  async create(newProduct: Product) {
    return await this.product.create(newProduct);
  }

  async findAll() {
    return await this.product.find();
  }

  async findOne(id: string) {
    return await this.product.findById(id);
  }

  async update(updateProduct: Product) {
    return this.product.update(updateProduct);
  }

  async removeUser(id: string) {
    return await this.product.delete(id);
  }
}
