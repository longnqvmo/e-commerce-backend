import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './model/comment.model';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { Product } from '../product/model/product.model';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Product])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
