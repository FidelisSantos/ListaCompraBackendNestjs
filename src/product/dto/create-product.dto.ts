import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Product } from '../entities/product.entity';

export class CreateProductDto extends Product {
  @IsEmail()
  @IsNotEmpty()
  id: string;

  @IsString({ each: true })
  Produto?: string[];

  constructor(id: string, Produto?: string[]) {
    super();
    this.id = id;
    this.Produto = Produto;
  }
}
