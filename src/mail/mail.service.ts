import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendSignUpConfirmation(createUserDto: CreateUserDto) {
    try {
      await this.mailerService.sendMail({
        to: createUserDto.email,
        subject: 'Sign Up confirmation',
        template: 'confirmation',
        context: {
          name: createUserDto.firstName,
        },
      });
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(e);
    }
  }
}
