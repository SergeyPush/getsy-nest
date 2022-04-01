import { Controller, Get, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('/')
  @UseGuards(AuthGuard())
  getAllProducts() {
    return this.productService.getAllProducts();
  }
}
