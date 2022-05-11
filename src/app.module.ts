import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ImageModule } from './image/image.module';
import { MailModule } from './mail/mail.module';
import { BasketModule } from './basket/basket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UserModule,
    ProductModule,
    AuthModule,
    PrismaModule,
    ImageModule,
    MailModule,
    BasketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
