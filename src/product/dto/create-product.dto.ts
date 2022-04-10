import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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
  @IsNumber()
  price: number;
}
