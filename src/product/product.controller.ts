import {
  BadRequestException,
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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { JwtInterface } from '../auth/types/jwt.interface';
import { ProductQueryDto } from './dto/product-query.dto';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('/')
  @ApiTags('products')
  @ApiOperation({ summary: 'Get all Products' })
  @ApiResponse({ status: 200, description: 'Ok' })
  getAllProducts(@Query() query: ProductQueryDto) {
    const { type, ids } = query;
    if (type) {
      return this.productService.getProductByType(type);
    }
    if (ids) {
      return this.productService.getProductsByIds(ids);
    }
    return this.productService.getAllProducts();
  }

  @Post()
  @UseGuards(AuthGuard())
  @ApiTags('products')
  @ApiOperation({ summary: 'Create product' })
  @ApiResponse({ status: 201, description: 'Created' })
  @UseInterceptors(FilesInterceptor('images'))
  createProduct(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() images: Array<Express.Multer.File>,
    @GetUser() user: JwtInterface,
  ) {
    createProductDto.authorId = user.id;
    return this.productService.createProduct(createProductDto, images);
  }

  @Get('/user/:id')
  @ApiTags('products')
  @ApiOperation({ summary: 'Get all products of the user' })
  @ApiResponse({ status: 200, description: 'Ok' })
  getProductByAuthor(@Param('id', ParseIntPipe) id: number) {
    if (!id) {
      throw new BadRequestException('No such user');
    }
    return this.productService.getProductByAuthor(id);
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
