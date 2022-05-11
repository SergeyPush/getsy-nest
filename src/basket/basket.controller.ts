import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AddToBasketDto } from './dto/addToBasketDto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { JwtInterface } from '../auth/types/jwt.interface';
import { BasketService } from './basket.service';

@Controller('basket')
export class BasketController {
  constructor(private basketService: BasketService) {}

  @Post()
  @UseGuards(AuthGuard())
  addToBasket(
    @Body() addToBasketDto: AddToBasketDto,
    @GetUser() user: JwtInterface,
  ) {
    addToBasketDto.userId = user.id;
    return this.basketService.addToBasket(addToBasketDto);
  }

  @Get()
  getBasket() {
    return this.basketService.getBasket();
  }

  @Get('/:id')
  getBasketByUserId(@Param('id', ParseIntPipe) id: number) {
    return this.basketService.getBasketByUserId(id);
  }
}
