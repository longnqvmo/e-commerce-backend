import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './model/favorite.model';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite])],
  controllers: [],
  providers: [],
})
export class FavoriteModule {}
