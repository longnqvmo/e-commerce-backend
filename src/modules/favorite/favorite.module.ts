import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './model/favorite.model';
import { Product } from '../product/model/product.model';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, Product])],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
