import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './model/payment.model';

@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  controllers: [],
  providers: [],
})
export class ProductModule {}
