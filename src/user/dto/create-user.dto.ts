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
  @IsString()
  id: string;
  @IsNotEmpty({ message: 'firstName must be a string' })
  @IsString()
  firstName: string;
  @IsNotEmpty({ message: 'lastName must be a string' })
  @IsString()
  lastName: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  @Length(3)
  password: string;
  @IsOptional()
  avatar?: string;
  @IsOptional()
  username?: string;
}
