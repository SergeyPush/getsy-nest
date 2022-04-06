import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateProductDto } from '../product/dto/create-product.dto';
import { UpdateProductDto } from '../product/dto/update-product.dto';

@Injectable()
export class ProductDbService {
  constructor(private prismaService: PrismaService) {}

  async getAllProducts() {
    return this.prismaService.product.findMany();
  }

  async getProductById(id: number) {
    const product = await this.prismaService.product.findUnique({
      where: {
        id,
      },
    });
    if (!product) {
      throw new BadRequestException('Product not found');
    }
    return product;
  }
  async createProduct(productDto: CreateProductDto) {
    return this.prismaService.product.create({ data: productDto });
  }
  async updateProduct(id: number, updateProduct: UpdateProductDto) {
    const product = await this.getProductById(id);
    return this.prismaService.product.update({
      where: {
        id: product.id,
      },
      data: updateProduct,
    });
  }

  async deleteProduct(id: number) {
    const product = await this.getProductById(id);
    this.prismaService.product.delete({
      where: {
        id: product.id,
      },
    });
    return { message: 'Product deleted' };
  }
}
