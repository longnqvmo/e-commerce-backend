import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImage } from './model/product-image.model';

@Module({
  imports: [TypeOrmModule.forFeature([ProductImage])],
  controllers: [],
  providers: [],
})
export class ProductImageModule {}
