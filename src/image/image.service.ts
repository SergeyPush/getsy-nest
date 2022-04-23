import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { writeFile } from 'fs-extra';

@Injectable()
export class ImageService {
  async saveImages(images: Array<Express.Multer.File>) {
    await this.saveImageToFile(images);
  }

  async saveImageToFile(images: Array<Express.Multer.File>) {
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
}
