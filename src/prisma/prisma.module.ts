import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserDbService } from './user-db.service';
import { ProductDbService } from './product-db.service';
import { BasketDbService } from './basket-db.service';

@Module({
  providers: [PrismaService, UserDbService, ProductDbService, BasketDbService],
  exports: [PrismaService, UserDbService, ProductDbService, BasketDbService],
})
export class PrismaModule {}
