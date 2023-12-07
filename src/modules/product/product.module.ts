import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './model/product.model';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { RateModule } from '../rate/rate.module';
import { VersionModule } from '../version/version.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), VersionModule, RateModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [],
})
export class ProductModule {}
