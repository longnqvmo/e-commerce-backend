import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './model/product.model';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [],
  providers: [],
})
export class ProductModule {}
