import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './model/category.model';
import { HttpResponse } from 'src/configs/HttpResponse.config';
import {
  CommonMessage,
  ErrorMessage,
} from 'src/common/constants/message.constants';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async handleGetAllCategory(paginate: any): Promise<HttpResponse> {
    try {
      const result = await this.categoryRepository.find({
        order: { name: 'ASC' },
        take: paginate.take,
        skip: (paginate.page - 1) * paginate.take,
        select: { name: true },
      });
      if (result) {
        return HttpResponse(HttpStatus.OK, CommonMessage.OK, result);
      } else {
        return HttpResponse(
          HttpStatus.NOT_FOUND,
          ErrorMessage.CATEGORY_NOT_FOUND,
        );
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleAddCategory(data: any): Promise<HttpResponse> {
    try {
      const check = await this.categoryRepository.findOne({
        where: { name: data.name },
      });
      if (check) {
        return HttpResponse(HttpStatus.CREATED, ErrorMessage.CATEGORY_EXIST);
      } else {
        await this.categoryRepository.save(data);
        return HttpResponse(
          HttpStatus.CREATED,
          CommonMessage.ADD_CATEGORY_SUCCEED,
        );
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleDeleteCategory(param: any): Promise<HttpResponse> {
    try {
      const result = await this.categoryRepository.find({
        where: { id: param.id },
      });
      if (result) {
        await this.categoryRepository.delete(param.id);
        return HttpResponse(
          HttpStatus.ACCEPTED,
          CommonMessage.DELETE_COMMENT_SUCCEED,
        );
      } else {
        return HttpResponse(
          HttpStatus.NOT_FOUND,
          ErrorMessage.CATEGORY_NOT_FOUND,
        );
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }
}
