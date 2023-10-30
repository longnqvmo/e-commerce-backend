import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rate } from './model/rate.model';
import { RateController } from './rate.controller';
import { RateService } from './rate.service';
import { Product } from '../product/model/product.model';

@Module({
  imports: [TypeOrmModule.forFeature([Rate, Product])],
  controllers: [RateController],
  providers: [RateService],
  exports: [RateService],
})
export class RateModule {}
