import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

import { DbService } from '../prisma/db.service';

@Injectable()
export class UserService {
  users: CreateUserDto[];
  constructor(private dbService: DbService) {}

  async getUserById(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
  async getAllUsers() {
    return this.dbService.getAllUsers();
  }
  async createUser(createUserDto: Omit<CreateUserDto, 'id'>) {
    return this.dbService.createUser(createUserDto);
  }
  async deleteUserById(id: number) {
    const candidate = await this.getUserById(id);
    return this.users.filter((user) => user.id !== candidate.id);
  }
  async updateUserById(id: number, updateUserDto: Partial<CreateUserDto>) {
    const user = await this.getUserById(id);
    return { ...user, ...updateUserDto };
  }

  async findUserByEmail(email: string): Promise<CreateUserDto> {
    return this.users.find((user) => user.email === email);
  }
}
