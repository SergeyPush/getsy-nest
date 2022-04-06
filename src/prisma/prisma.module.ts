import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserDbService } from './user-db.service';
import { ProductDbService } from './product-db.service';

@Module({
  providers: [PrismaService, UserDbService, ProductDbService],
  exports: [PrismaService, UserDbService, ProductDbService],
})
export class PrismaModule {}
