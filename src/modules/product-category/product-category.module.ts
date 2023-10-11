import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from './model/product-category.model';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategory])],
  controllers: [],
  providers: [],
})
export class ProductCategoryModule {}
