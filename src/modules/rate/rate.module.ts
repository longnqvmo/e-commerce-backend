import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rate } from './model/rate.model';

@Module({
  imports: [TypeOrmModule.forFeature([Rate])],
  controllers: [],
  providers: [],
})
export class RateModule {}
