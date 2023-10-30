import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from './model/token.model';
import { User } from '../user/model/user.model';
import { HttpResponse } from 'src/configs/HttpResponse.config';
import {
  CommonMessage,
  ErrorMessage,
} from 'src/common/constants/message.constants';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // async handleGetToken(query: any): Promise<HttpResponse> {
  //   try {
  //     const rates = await this.tokenRepository.find({
  //       where: { productId: query.id },
  //       select: { rate: true },
  //     });
  //     if (rates && rates.length > 0) {
  //       let result: number = 0;
  //       rates.map((rate) => {
  //         if (result === 0) {
  //           result = rate.rate;
  //         } else {
  //           result = (result + rate.rate) / 2;
  //         }
  //       });
  //       return HttpResponse(HttpStatus.OK, CommonMessage.OK, result);
  //     } else {
  //       return HttpResponse(
  //         HttpStatus.NOT_FOUND,
  //         ErrorMessage.PRODUCT_NOT_FOUND,
  //       );
  //     }
  //   } catch (error) {
  //     return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
  //   }
  // }

  async generateToken(param: any): Promise<HttpResponse> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: param.id },
      });
      if (user) {
        const token =
          new Date().getTime() + Math.random().toString(16).slice(2);
        await this.tokenRepository.save({
          userId: param.id,
          token,
        });
        return HttpResponse(HttpStatus.CREATED, CommonMessage.OK);
      } else {
        return HttpResponse(
          HttpStatus.NOT_FOUND,
          ErrorMessage.PRODUCT_NOT_FOUND,
        );
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }
}
