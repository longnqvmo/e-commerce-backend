import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCart } from './model/product-cart.model';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCart])],
  controllers: [],
  providers: [],
})
export class CartModule {}
