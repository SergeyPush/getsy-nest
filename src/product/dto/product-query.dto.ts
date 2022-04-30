import { IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class ProductQueryDto {
  @IsOptional()
  @IsString()
  type?: 'product' | 'service';
  @IsOptional()
  @Transform(({ value }) => value.split(',').map((item) => Number(item)))
  ids?: number[];
}
