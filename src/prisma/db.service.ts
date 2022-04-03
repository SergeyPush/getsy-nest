import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class DbService {
  constructor(private prismaService: PrismaService) {}

  async getAllUsers() {
    this.prismaService.user.findMany();
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });
    if (!user) {
      return this.prismaService.user.create({
        data: createUserDto,
      });
    } else {
      throw new BadRequestException('User is already exists');
    }
  }
}
