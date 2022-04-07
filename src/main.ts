import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Getsy Backend')
    .setDescription('The Getsy API description')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('users')
    .addTag('products')
    .addBearerAuth()
    .addServer('/api')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  app.setGlobalPrefix('/api');
  app.enableCors();
  const PORT = process.env.PORT || 4001;
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  console.log(`App is started on ${PORT}`);
  await app.listen(PORT);
}
bootstrap();
