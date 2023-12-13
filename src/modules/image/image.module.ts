import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImage } from './model/product_image.model';
import { Product } from '../product/model/product.model';
import { UploadModule } from '../upload/upload.module';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { VersionImage } from './model/version_image.model';
import { Version } from '../version/model/version.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductImage, Product, VersionImage, Version]),
    UploadModule,
  ],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
