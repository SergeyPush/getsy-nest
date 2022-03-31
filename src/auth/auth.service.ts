import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(signInUserDto: LoginUserDto) {
    const { email, password } = signInUserDto;
    const user = await this.userService.findUserByEmail(email);
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      return { message: 'success' };
    }
    return { message: 'fail' };
  }

  async signUp(createUserDto: Omit<CreateUserDto, 'id'>) {
    const { password, ...rest } = createUserDto;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return this.userService.createUser({ ...rest, password: hashedPassword });
  }
}
