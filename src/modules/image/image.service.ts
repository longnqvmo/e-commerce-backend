import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductImage } from './model/product_image.model';
import { Product } from '../product/model/product.model';
import { HttpResponse } from 'src/configs/HttpResponse.config';
import {
  CommonMessage,
  ErrorMessage,
} from 'src/common/constants/message.constants';
import { UploadService } from '../upload/upload.service';
import { VersionImage } from './model/version_image.model';
import { Version } from '../version/model/version.model';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(ProductImage)
    private productImageRepository: Repository<ProductImage>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(VersionImage)
    private versionImageRepository: Repository<VersionImage>,
    @InjectRepository(Version)
    private versionRepository: Repository<Version>,
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

  async uploadVersionImage(param: any, file: any): Promise<HttpResponse> {
    try {
      const product = await this.versionRepository.findOne({
        where: { id: param.id },
      });
      if (product) {
        const imageUrl = await this.uploadService.uploadImage(file);
        await this.versionImageRepository.save({
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
