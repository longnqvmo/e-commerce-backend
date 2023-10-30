import { Injectable, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/modules/user/model/user.model';
import { HttpResponse } from 'src/configs/HttpResponse.config';
import { PasswordService } from 'src/auth/password.service';
import {
  CommonMessage,
  ErrorMessage,
} from 'src/common/constants/message.constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private passwordService: PasswordService,
  ) {}

  async handleSignUp(data: any): Promise<HttpResponse> {
    try {
      const checkEmail = await this.userRepository.findOneBy({
        email: data.email,
      });
      if (checkEmail) {
        return HttpResponse(
          HttpStatus.BAD_REQUEST,
          ErrorMessage.EMAIL_HAS_BEEN_USED,
        );
      } else {
        const hashPassword = await this.passwordService.hashPassword(
          data.password,
        );
        await this.userRepository.save({
          username: data.username,
          email: data.email,
          password: hashPassword,
        });
        return HttpResponse(HttpStatus.CREATED, CommonMessage.SIGN_UP_SUCCEED);
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleSignIn(data: any): Promise<HttpResponse> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: data.email },
        select: {
          id: true,
          username: true,
          email: true,
          password: true,
          role: true,
        },
      });
      if (!user) {
        return HttpResponse(HttpStatus.NOT_FOUND, ErrorMessage.USER_NOT_FOUND);
      }
      const checkPassword = await this.passwordService.comparePassword(
        data.password,
        user.password,
      );
      if (!checkPassword) {
        return HttpResponse(
          HttpStatus.UNAUTHORIZED,
          ErrorMessage.WRONG_PASSWORD,
        );
      } else {
        const payload = {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        };
        const access_token = await this.jwtService.signAsync(payload);
        return HttpResponse(HttpStatus.OK, CommonMessage.OK, access_token);
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleChangePassword(user: any, data: any): Promise<HttpResponse> {
    try {
      const result = await this.userRepository.findOneBy({
        id: user.id,
      });
      if (result) {
        const checkPassword = await this.passwordService.comparePassword(
          data.currentPassword,
          result.password,
        );
        if (checkPassword) {
          const hashPassword = await this.passwordService.hashPassword(
            data.newPassword,
          );
          await this.userRepository.update(user.id, {
            password: hashPassword,
            updatedAt: new Date(),
          });
          return HttpResponse(
            HttpStatus.CREATED,
            CommonMessage.CHANGE_PASSWORD_SUCCEED,
          );
        } else {
          return HttpResponse(
            HttpStatus.UNAUTHORIZED,
            ErrorMessage.WRONG_PASSWORD,
          );
        }
      } else {
        return HttpResponse(HttpStatus.NOT_FOUND, ErrorMessage.USER_NOT_FOUND);
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  // async handleUpdateAccount(account: any, data: any): Promise<HttpResponse> {
  //   try {
  //     const result = await this.userRepository.findOneBy({
  //       id: account.id,
  //     });
  //     if (result) {
  //       const check = await this.userRepository.findOne({
  //         where: { id: Not(account.id), email: data.email },
  //       });
  //       if (check) {
  //         return HttpResponse(
  //           HttpStatus.BAD_REQUEST,
  //           ErrorMessage.EMAIL_HAS_BEEN_USED,
  //         );
  //       } else {
  //         await this.userRepository.update(account.id, {
  //           ...data,
  //           updatedAt: new Date(),
  //         });
  //         return HttpResponse(
  //           HttpStatus.CREATED,
  //           CommonMessage.UPDATE_ACCOUNT_SUCCEED,
  //         );
  //       }
  //     } else {
  //       return HttpResponse(
  //         HttpStatus.NOT_FOUND,
  //         ErrorMessage.USER_NOT_FOUND,
  //       );
  //     }
  //   } catch (error) {
  //     return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
  //   }
  // }
}
