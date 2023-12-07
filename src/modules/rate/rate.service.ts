import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rate } from './model/rate.model';
import { Product } from '../product/model/product.model';
import { HttpResponse } from 'src/configs/HttpResponse.config';
import {
  CommonMessage,
  ErrorMessage,
} from 'src/common/constants/message.constants';

@Injectable()
export class RateService {
  constructor(
    @InjectRepository(Rate)
    private rateRepository: Repository<Rate>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async handleGetRate(query: any): Promise<HttpResponse> {
    try {
      const rates = await this.rateRepository.find({
        where: { productId: query.id },
        select: { rate: true },
      });
      let result: number = 0;
      if (rates && rates.length > 0) {
        rates.map((rate) => {
          if (result === 0) {
            result = rate.rate;
          } else {
            result = (result + rate.rate) / 2;
          }
        });
        return HttpResponse(HttpStatus.OK, CommonMessage.OK, result);
      } else {
        return HttpResponse(HttpStatus.OK, CommonMessage.OK, result);
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleRate(user: any, param: any, data: any): Promise<HttpResponse> {
    try {
      const result = await this.productRepository.findOne({
        where: { id: param.id },
      });
      if (result) {
        const checkUser = await this.rateRepository.findOne({
          where: { userId: user.id, productId: param.id },
        });
        if (checkUser) {
          await this.rateRepository.save({
            ...checkUser,
            ...data,
            updatedAt: new Date(),
          });
          return HttpResponse(HttpStatus.CREATED, CommonMessage.RATE_SUCCEED);
        } else {
          await this.rateRepository.save({
            userId: user.id,
            productId: param.id,
            ...data,
          });
          return HttpResponse(HttpStatus.CREATED, CommonMessage.RATE_SUCCEED);
        }
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

  // async handleDeleteRate(user: any, param: any): Promise<HttpResponse> {
  //   try {
  //     const result = await this.commentRepository.find({
  //       where: { id: param.comment_id },
  //     });

  //     if (result) {
  //       await this.commentRepository.delete(param.comment_id);
  //       return HttpResponse(
  //         HttpStatus.ACCEPTED,
  //         CommonMessage.DELETE_COMMENT_SUCCEED,
  //       );
  //     } else {
  //       return HttpResponse(
  //         HttpStatus.NOT_FOUND,
  //         ErrorMessage.COMMENT_NOT_FOUND,
  //       );
  //     }
  //   } catch (error) {
  //     return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
  //   }
  // }
}
