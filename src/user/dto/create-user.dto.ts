import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  id?: number;
  @IsNotEmpty({ message: 'firstName must be a string' })
  @IsString()
  firstName: string;
  @IsNotEmpty({ message: 'lastName must be a string' })
  @IsString()
  lastName: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsOptional()
  avatar?: string;
  @IsOptional()
  username?: string;
}
