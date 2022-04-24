import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { JwtInterface } from './types/jwt.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @ApiTags('auth')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiBody({
    type: LoginUserDto,
    examples: {
      example: {
        value: {
          email: 'example@mail.com',
          password: '123456',
        },
      },
    },
  })
  async signIn(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post('/signup')
  @ApiTags('auth')
  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiBody({
    type: CreateUserDto,
    examples: {
      example: {
        value: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'example@mail.com',
          password: '123456',
        },
      },
    },
  })
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Get('/test')
  @UseGuards(AuthGuard())
  async test(@GetUser() user: JwtInterface) {
    return user;
  }
}
