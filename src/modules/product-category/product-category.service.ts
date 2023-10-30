import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import { ProductCategory } from './model/product-category.model';
import { HttpResponse } from 'src/configs/HttpResponse.config';
import { PageDTO } from 'src/common/dto/page.dto';
import { MetaDTO } from 'src/common/dto/meta.dto';
import {
  CommonMessage,
  ErrorMessage,
} from 'src/common/constants/message.constants';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private productCategoryRepository: Repository<ProductCategory>,
    private dataSource: DataSource,
  ) {}

  async handleGetAllProduct(query: any, paginate: any): Promise<HttpResponse> {
    try {
      const [data, count] = await this.productCategoryRepository
        .createQueryBuilder('p')
        .leftJoin('p.product', 'product')
        .where('p.categoryId = :id', { id: query.id })
        .select(['p.id', 'product.name', 'product.price'])
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
          ErrorMessage.CATEGORY_NOT_FOUND,
        );
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleAddCategoryToProduct(data: any) {
    try {
      const checkList = [];
      data.productCategory.map((item) => {
        checkList.push(item.productId);
      });
      const result = await this.productCategoryRepository.find({
        where: { productId: In(checkList) },
      });
      if (result.length > 0) {
        await this.productCategoryRepository.remove(result);
        await this.productCategoryRepository.save(data.productCategory);
        return HttpResponse(HttpStatus.OK, CommonMessage.OK);
      } else {
        await this.productCategoryRepository.save(data.productCategory);
        return HttpResponse(HttpStatus.OK, CommonMessage.OK);
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }
}
