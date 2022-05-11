import { Injectable } from '@nestjs/common';
import { AddToBasketDto } from './dto/addToBasketDto';
import { BasketDbService } from '../prisma/basket-db.service';

@Injectable()
export class BasketService {
  constructor(private basketDbService: BasketDbService) {}

  async addToBasket(addToBasketDto: AddToBasketDto) {
    return this.basketDbService.addToBasket(addToBasketDto);
  }

  async getBasket() {
    return this.basketDbService.getBasket();
  }

  async getBasketByUserId(id: number) {
    return this.basketDbService.getBasketByUserId(id);
  }
}
