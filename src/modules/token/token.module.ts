import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './model/token.model';
import { User } from '../user/model/user.model';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';

@Module({
  imports: [TypeOrmModule.forFeature([Token, User])],
  controllers: [TokenController],
  providers: [TokenService],
})
export class TokenModule {}
