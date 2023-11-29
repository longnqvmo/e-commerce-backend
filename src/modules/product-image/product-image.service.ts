import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductImage } from './model/product-image.model';
import { Product } from '../product/model/product.model';
import { HttpResponse } from 'src/configs/HttpResponse.config';
import {
  CommonMessage,
  ErrorMessage,
} from 'src/common/constants/message.constants';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class ProductImageService {
  constructor(
    @InjectRepository(ProductImage)
    private productImageRepository: Repository<ProductImage>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private uploadService: UploadService,
  ) {}

  async uploadProductImage(param: any, file: any): Promise<HttpResponse> {
    try {
      const product = await this.productRepository.findOne({
        where: { id: param.id },
      });
      if (product) {
        const imageUrl = await this.uploadService.uploadImage(file);
        await this.productImageRepository.save({
          productId: param.id,
          image: imageUrl,
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
