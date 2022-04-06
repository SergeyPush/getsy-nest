import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('/')
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Get('/:id')
  getProductById(@Param('id') id: number) {
    return this.productService.getProductById(id);
  }
  @Delete('id')
  deleteProductById(@Param('id') id: number) {
    return this.productService.deleteProductById(id);
  }

  @Patch('/:id')
  updateProductById(
    @Param('id') id: number,
    @Body() product: UpdateProductDto,
  ) {
    return this.productService.updateProductById(id, product);
  }
}
