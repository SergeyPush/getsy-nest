import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(signInUserDto: LoginUserDto) {
    const { email, password } = signInUserDto;
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException('Username or password is not valid');
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      return this.createToken(user);
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async signUp(createUserDto: Omit<CreateUserDto, 'id'>) {
    const { password, ...rest } = createUserDto;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return this.userService.createUser({ ...rest, password: hashedPassword });
  }

  private createToken(user: CreateUserDto) {
    const { email, id } = user;
    const payload = { email, id };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
