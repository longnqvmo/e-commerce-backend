import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './model/favorite.model';
import { Product } from '../product/model/product.model';
import { HttpResponse } from 'src/configs/HttpResponse.config';
import {
  CommonMessage,
  ErrorMessage,
} from 'src/common/constants/message.constants';
import { PageDTO } from 'src/common/dto/page.dto';
import { MetaDTO } from 'src/common/dto/meta.dto';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async handleGetListFavorite(user: any, paginate: any): Promise<HttpResponse> {
    try {
      const [data, count] = await this.favoriteRepository
        .createQueryBuilder('f')
        .leftJoin('f.product', 'product')
        .where('f.userId = :userId', { userId: user.id })
        .select(['f.id', 'product.name'])
        .getManyAndCount();

      const result = new PageDTO(
        data,
        new MetaDTO(count, paginate.take, paginate.page),
      );
      if (result) {
        return HttpResponse(HttpStatus.OK, CommonMessage.OK, result);
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

  async handleFavorite(user: any, param: any): Promise<HttpResponse> {
    try {
      const result = await this.productRepository.findOne({
        where: { id: param.id },
      });
      if (result) {
        const checkFavorite = await this.favoriteRepository.findOne({
          where: { userId: user.id, productId: param.id },
        });
        if (checkFavorite) {
          await this.favoriteRepository.delete(checkFavorite.id);
          return HttpResponse(HttpStatus.CREATED, CommonMessage.UNFAVORITE);
        } else {
          await this.favoriteRepository.save({
            userId: user.id,
            productId: param.id,
          });
          return HttpResponse(HttpStatus.CREATED, CommonMessage.FAVORITE);
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
}
