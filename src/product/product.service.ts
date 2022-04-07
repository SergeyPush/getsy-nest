import { Injectable } from '@nestjs/common';
import { ProductDbService } from '../prisma/product-db.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private prismaProduct: ProductDbService) {}

  async getAllProducts() {
    return this.prismaProduct.getAllProducts();
  }

  async createProduct(createProductDto: CreateProductDto) {
    return this.prismaProduct.createProduct(createProductDto);
  }

  async getProductById(id: number) {
    return this.prismaProduct.getProductById(id);
  }
  async deleteProductById(id: number) {
    return this.prismaProduct.deleteProduct(id);
  }
  async updateProductById(id: number, updateProductDto: UpdateProductDto) {
    return this.prismaProduct.updateProduct(id, updateProductDto);
  }
}
