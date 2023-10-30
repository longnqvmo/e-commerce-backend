import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './model/comment.model';
import { Product } from '../product/model/product.model';
import { HttpResponse } from 'src/configs/HttpResponse.config';
import {
  CommonMessage,
  ErrorMessage,
} from 'src/common/constants/message.constants';
import { MetaDTO } from 'src/common/dto/meta.dto';
import { PageDTO } from 'src/common/dto/page.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}
  async handleGetAllComment(query: any, paginate: any): Promise<HttpResponse> {
    try {
      const [data, count] = await this.commentRepository
        .createQueryBuilder('c')
        .leftJoin('c.user', 'user')
        .where('c.productId = :productId', { productId: query.id })
        .select(['c.id', 'c.comment', 'user.username'])
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

  async handleAddComment(
    user: any,
    param: any,
    data: any,
  ): Promise<HttpResponse> {
    try {
      const result = await this.productRepository.findOne({
        where: { id: param.id },
      });
      if (result) {
        await this.commentRepository.save({
          userId: user.id,
          productId: param.id,
          parentId: data.parentId ? data.parentId : null,
          comment: data.comment,
        });
        return HttpResponse(
          HttpStatus.CREATED,
          CommonMessage.ADD_COMMENT_SUCCEED,
        );
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

  async handleDeleteComment(user: any, param: any): Promise<HttpResponse> {
    try {
      const result = await this.commentRepository.findOne({
        where: { id: param.id },
      });
      if (result) {
        if (result.userId === user.id) {
          await this.commentRepository.delete(param.id);
          return HttpResponse(
            HttpStatus.ACCEPTED,
            CommonMessage.DELETE_COMMENT_SUCCEED,
          );
        } else {
          return HttpResponse(
            HttpStatus.BAD_REQUEST,
            ErrorMessage.COMMENT_CAN_NOT_DELETE,
          );
        }
      } else {
        return HttpResponse(
          HttpStatus.NOT_FOUND,
          ErrorMessage.COMMENT_NOT_FOUND,
        );
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }
}
