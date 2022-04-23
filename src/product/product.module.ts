import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ImageModule } from '../image/image.module';

@Module({
  imports: [AuthModule, PrismaModule, ImageModule],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
