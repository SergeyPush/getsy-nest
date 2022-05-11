import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AddToBasketDto } from '../basket/dto/addToBasketDto';

@Injectable()
export class BasketDbService {
  constructor(private prismaService: PrismaService) {}

  async addToBasket(addToBasketDto: AddToBasketDto) {
    const { productId, userId } = addToBasketDto;
    return this.prismaService.basket.create({
      data: { productId, userId },
    });
  }

  async getBasket() {
    return this.prismaService.basket.findMany({
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            avatar: true,
          },
        },
        product: true,
      },
    });
  }

  async getBasketByUserId(id: number) {
    return this.prismaService.basket.findMany({
      where: {
        userId: id,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            avatar: true,
          },
        },
        product: true,
      },
    });
  }
}
