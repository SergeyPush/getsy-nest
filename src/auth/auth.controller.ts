import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async signIn(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post('/signup')
  async signUp(@Body() createUserDto: Omit<CreateUserDto, 'id'>) {
    return this.authService.signUp(createUserDto);
  }

  @Get('/test')
  @UseGuards(AuthGuard())
  async test(@GetUser() user: any) {
    console.log(user.username);
  }
}
