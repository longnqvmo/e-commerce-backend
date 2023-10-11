import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './model/cart.model';

@Module({
  imports: [TypeOrmModule.forFeature([Cart])],
  controllers: [],
  providers: [],
})
export class CartModule {}
