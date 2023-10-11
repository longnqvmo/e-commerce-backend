import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './model/token.model';

@Module({
  imports: [TypeOrmModule.forFeature([Token])],
  controllers: [],
  providers: [],
})
export class TokenModule {}
