import { IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class AddToBasketDto {
  @IsNumber()
  @IsOptional()
  userId?: number;
  @IsNumber()
  @Transform(({ value }) => Number(value))
  productId: number;
}
