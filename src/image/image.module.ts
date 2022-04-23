import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { path } from 'app-root-path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: `${path}/public`,
      serveRoot: '/public',
    }),
  ],
  providers: [ImageService],
  exports: [ImageService],
})
export class ImageModule {}
