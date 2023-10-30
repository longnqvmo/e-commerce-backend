import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './model/product.model';
import { HttpResponse } from 'src/configs/HttpResponse.config';
import {
  CommonMessage,
  ErrorMessage,
} from 'src/common/constants/message.constants';
import { MetaDTO } from 'src/common/dto/meta.dto';
import { PageDTO } from 'src/common/dto/page.dto';
import { RateService } from '../rate/rate.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private rateService: RateService,
  ) {}

  async handleGetProduct(query: any): Promise<HttpResponse> {
    try {
      const result = await this.productRepository.findOne({
        where: { id: query.id },
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
        },
      });
      if (result) {
        const rate = await this.rateService.handleGetRate(query.id);
        result['rate'] = rate.data;
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

  async handleGetAllProduct(paginate: any): Promise<HttpResponse> {
    try {
      const data = await this.productRepository.findAndCount({
        order: { name: 'ASC' },
        take: paginate.take,
        skip: (paginate.page - 1) * paginate.take,
        select: {
          id: true,
          name: true,
          price: true,
        },
      });

      const meta = new MetaDTO(data[1], paginate.take, paginate.page);
      const result = new PageDTO(data[0], meta);

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

  async handleAddProduct(data: any): Promise<HttpResponse> {
    try {
      await this.productRepository.save(data);
      return HttpResponse(
        HttpStatus.CREATED,
        CommonMessage.ADD_PRODUCT_SUCCEED,
      );
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleUpdateProduct(param: any, data: any): Promise<HttpResponse> {
    try {
      const result = await this.productRepository.findOne({
        where: { id: param.id },
      });
      if (result) {
        await this.productRepository.update(param.id, data);
        return HttpResponse(
          HttpStatus.CREATED,
          CommonMessage.UPDATE_PRODUCT_SUCCEED,
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

  async handleDeleteProduct(param: any): Promise<HttpResponse> {
    try {
      const result = await this.productRepository.findOne({
        where: { id: param.id },
      });

      if (result) {
        await this.productRepository.delete(param.id);
        return HttpResponse(
          HttpStatus.ACCEPTED,
          CommonMessage.DELETE_PRODUCT_SUCCEED,
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
}
