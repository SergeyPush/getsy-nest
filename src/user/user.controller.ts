import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiTags('users')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Ok' })
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('/:id')
  @ApiTags('users')
  @ApiOperation({ summary: 'Get single users' })
  @ApiResponse({ status: 200, description: 'Ok' })
  async findUserById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @Post()
  @ApiTags('users')
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, description: 'Ok' })
  async createUser(@Body() createUser: Omit<CreateUserDto, 'id'>) {
    return this.userService.createUser(createUser);
  }

  @Patch('/:id')
  @ApiTags('users')
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, description: 'Ok' })
  async updateUserById(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUserById(id, updateUserDto);
  }

  @Delete('/:id')
  @ApiTags('users')
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, description: 'Ok' })
  async deleteUserById(@Param('id') id: number) {
    return this.userService.deleteUserById(id);
  }
}
