import { Injectable } from '@nestjs/common';
import { ProductDbService } from '../prisma/product-db.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ImageService } from '../image/image.service';

@Injectable()
export class ProductService {
  constructor(
    private prismaProduct: ProductDbService,
    private imageService: ImageService,
  ) {}

  async getAllProducts() {
    return this.prismaProduct.getAllProducts();
  }
  async getProductByType(type: string) {
    return this.prismaProduct.getProductByType(type);
  }

  async createProduct(
    createProductDto: CreateProductDto,
    images: Array<Express.Multer.File>,
  ) {
    if (images && process.env.NODE_ENV === 'development') {
      await this.imageService.saveImagesLocally(images);
    }
    if (images && process.env.NODE_ENV !== 'development') {
      const res = await this.imageService.saveOnServer(images);
      const urls = res.map((image) => image.filePath);
      const ids = res.map((image) => image.fileId);
      createProductDto.images = urls;
      createProductDto.imageId = ids;
    }
    return this.prismaProduct.createProduct(createProductDto);
  }

  async getProductById(id: number) {
    return this.prismaProduct.getProductById(id);
  }
  async deleteProductById(id: number) {
    return this.prismaProduct.deleteProduct(id);
  }
  async updateProductById(id: number, updateProductDto: UpdateProductDto) {
    return this.prismaProduct.updateProduct(id, updateProductDto);
  }
}
