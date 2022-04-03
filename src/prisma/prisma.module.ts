import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserDbService } from './user-db.service';

@Module({
  providers: [PrismaService, UserDbService],
  exports: [PrismaService, UserDbService],
})
export class PrismaModule {}
