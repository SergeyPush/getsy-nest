import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('/')
  @ApiTags('products')
  @ApiOperation({ summary: 'Get all Products' })
  @ApiResponse({ status: 200, description: 'Ok' })
  getAllProducts(@Query('type') type: 'product' | 'service') {
    if (type) {
      return this.productService.getProductByType(type);
    }
    return this.productService.getAllProducts();
  }

  @Post()
  @ApiTags('products')
  @ApiOperation({ summary: 'Create product' })
  @ApiResponse({ status: 201, description: 'Created' })
  @UseInterceptors(FilesInterceptor('images'))
  createProduct(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() data: Array<Express.Multer.File>,
  ) {
    // console.log(createProductDto);
    // console.log(data);

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
    @Param('id', ParseIntPipe) id: number,
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
