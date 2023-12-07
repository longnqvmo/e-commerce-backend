import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImage } from './model/product_image.model';
import { Product } from '../product/model/product.model';
import { UploadModule } from '../upload/upload.module';
import { ProductImageController } from './product_image.controller';
import { ProductImageService } from './product_image.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductImage, Product]), UploadModule],
  controllers: [ProductImageController],
  providers: [ProductImageService],
})
export class ProductImageModule {}
