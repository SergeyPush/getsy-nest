import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class UserDbService {
  constructor(private prismaService: PrismaService) {}

  async getAllUsers() {
    return this.prismaService.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        avatar: true,
      },
    });
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.getUserByEmail(createUserDto.email);
    if (user) {
      throw new BadRequestException('User is already exists');
    }
    return this.prismaService.user.create({
      data: createUserDto,
    });
  }
  async getUserById(id: number) {
    const user = await this.prismaService.user.findUnique({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        avatar: true,
      },
      where: {
        id,
      },
    });
    if (!user) {
      throw new BadRequestException('No user found');
    }
    return user;
  }

  async getUserByEmail(email: string) {
    return await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  async deleteUserById(id: number) {
    const user = await this.getUserById(id);
    return await this.prismaService.user.delete({
      where: {
        id: user.id,
      },
    });
  }

  async updateUserById(id: number, data: Partial<CreateUserDto>) {
    const user = await this.getUserById(id);
    return await this.prismaService.user.updateMany({
      where: {
        id: user.id,
      },
      data,
    });
  }
}
