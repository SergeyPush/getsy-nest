import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  RequestMapping,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('/')
  @ApiTags('products')
  @ApiOperation({ summary: 'Get all Products' })
  @ApiResponse({ status: 200, description: 'Ok' })
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Post()
  @ApiTags('products')
  @ApiOperation({ summary: 'Create product' })
  @ApiResponse({ status: 201, description: 'Created' })
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Get('/:id')
  @ApiTags('products')
  @ApiOperation({ summary: 'Get Single product' })
  @ApiResponse({ status: 200, description: 'Ok' })
  getProductById(@Param('id') id: number) {
    return this.productService.getProductById(id);
  }

  @Patch('/:id')
  @ApiTags('products')
  @ApiOperation({ summary: 'Update product' })
  @ApiResponse({ status: 200, description: 'Ok' })
  updateProductById(
    @Param('id') id: number,
    @Body() product: UpdateProductDto,
  ) {
    return this.productService.updateProductById(id, product);
  }

  @Delete('/:id')
  @ApiTags('products')
  @ApiOperation({ summary: 'Delete single product' })
  @ApiResponse({ status: 200, description: 'Ok' })
  deleteProductById(@Param('id') id: number) {
    return this.productService.deleteProductById(id);
  }
}
