import { Collection } from 'fireorm';
import * as dotenv from 'dotenv';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

dotenv.config();
@Collection(process.env.FIRESTORE_COLLECTION_PRODUCTS)
export class Product {
  @IsEmail()
  @IsNotEmpty()
  id: string;
  @IsString({ each: true })
  Produto?: string[];
}
