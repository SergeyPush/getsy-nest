import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

import { UserDbService } from '../prisma/user-db.service';

@Injectable()
export class UserService {
  constructor(private dbService: UserDbService) {}

  async getUserById(id: number) {
    return this.dbService.getUserById(id);
  }

  async getAllUsers() {
    return this.dbService.getAllUsers();
  }

  async createUser(createUserDto: Omit<CreateUserDto, 'id'>) {
    return this.dbService.createUser(createUserDto);
  }

  async deleteUserById(id: number) {
    await this.dbService.deleteUserById(id);
    return { status: 'User deleted' };
  }

  async updateUserById(id: number, updateUserDto: Partial<CreateUserDto>) {
    return this.dbService.updateUserById(id, updateUserDto);
  }

  async findUserByEmail(email: string): Promise<CreateUserDto> {
    return this.dbService.getUserByEmail(email);
  }
}
