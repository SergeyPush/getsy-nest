import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export enum ProductTypeEnum {
  PRODUCT = 'product',
  SERVICE = 'service',
}
export class CreateProductDto {
  @IsNumber()
  @IsOptional()
  id?: number;
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNotEmpty()
  @IsString({ each: true })
  features: string[];
  @IsNotEmpty()
  @IsEnum(ProductTypeEnum)
  type: string;
  @IsNotEmpty({ message: 'Price is required' })
  @IsNumber()
  @Transform(({ value }) => Number(value))
  price: number;
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  quantity: number;
  @IsOptional()
  @IsString({ each: true })
  images?: string[];
  @IsOptional()
  @IsString({ each: true })
  imageId?: string[];
  authorId?: number;
}
