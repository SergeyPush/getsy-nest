import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  products: object;
  constructor() {
    this.products = {
      name: 'Product 1',
      description: 'This is amazing description of Product 1',
    };
  }

  getAllProducts() {
    return this.products;
  }
}
