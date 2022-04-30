import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateProductDto } from '../product/dto/create-product.dto';
import { UpdateProductDto } from '../product/dto/update-product.dto';

@Injectable()
export class ProductDbService {
  constructor(private prismaService: PrismaService) {}

  async getAllProducts() {
    return this.prismaService.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  async getProductByType(type: string) {
    return this.prismaService.product.findMany({
      where: {
        type,
      },
    });
  }

  async getProductByAuthor(userId: number) {
    return this.prismaService.product.findMany({
      where: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        authorId: userId,
      },
    });
  }

  async getProductsByIds(ids: number[]) {
    return this.prismaService.product.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async getProductById(id: number) {
    const product = await this.prismaService.product.findUnique({
      where: {
        id,
      },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            avatar: true,
          },
        },
      },
    });

    if (!product) {
      throw new BadRequestException('Product not found');
    }
    return product;
  }
  async createProduct(productDto: CreateProductDto) {
    const { id, ...rest } = productDto;
    return this.prismaService.product.create({ data: rest });
  }
  async updateProduct(id: number, updateProduct: UpdateProductDto) {
    const product = await this.getProductById(id);
    return this.prismaService.product.update({
      where: {
        id: product.id,
      },
      data: { ...updateProduct },
    });
  }

  async deleteProduct(id: number) {
    const product = await this.getProductById(id);
    await this.prismaService.product.delete({
      where: {
        id: product.id,
      },
    });
    return { message: 'Product deleted' };
  }
}
