import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { path } from 'app-root-path';
import { writeFile } from 'fs-extra';
import { imagekit } from './imagekit.config';

@Injectable()
export class ImageService {
  async saveImagesLocally(images: Array<Express.Multer.File>) {
    return await this.saveImageToFile(images);
  }

  async saveOnServer(images: Array<Express.Multer.File>) {
    return this.saveToServer(images);
  }

  private async saveImageToFile(images: Array<Express.Multer.File>) {
    const uploadDir = `${path}/public`;
    if (images) {
      await Promise.all(
        images.map(async (image) => {
          const fileName = image.originalname;
          return writeFile(`${uploadDir}/${fileName}`, image.buffer);
        }),
      );
    }
  }

  private async saveToServer(images: Array<Express.Multer.File>) {
    try {
      return Promise.all(
        images.map(
          async (image) =>
            await imagekit.upload({
              file: image.buffer,
              fileName: image.originalname,
              folder: 'getsy',
            }),
        ),
      );
    } catch (e) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
