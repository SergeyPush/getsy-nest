import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  data: object;

  constructor() {
    this.data = { name: 'Smith' };
  }

  getHello(): string {
    return 'Hello World!';
  }

  getSomeData() {
    return this.data;
  }
}
