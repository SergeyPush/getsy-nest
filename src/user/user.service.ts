import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  users: CreateUserDto[];
  constructor() {
    this.users = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@mail.com',
        password: '123456',
      },
      {
        id: '2',
        firstName: 'Adam',
        lastName: 'Smith',
        email: 'smithadam@mail.com',
        password: '123456',
      },
      {
        id: '3',
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'janedoe@mail.com',
        password: '123456',
      },
    ];
  }

  async getUserById(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
  async getAllUsers() {
    return this.users;
  }
  async createUser(createUserDto: Omit<CreateUserDto, 'id'>) {
    const user = { ...createUserDto, id: Date.now().toString() };
    this.users.push(user);
    return user;
  }
  async deleteUserById(id: string) {
    const candidate = await this.getUserById(id);
    return this.users.filter((user) => user.id !== candidate.id);
  }
  async updateUserById(id: string, updateUserDto: Partial<CreateUserDto>) {
    const user = await this.getUserById(id);
    return { ...user, ...updateUserDto };
  }

  async findUserByEmail(email: string): Promise<CreateUserDto> {
    const user = this.users.find((user) => user.email === email);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
