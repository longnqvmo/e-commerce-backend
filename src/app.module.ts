import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConnectDBModule } from './connect/database/database.connect';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { TokenModule } from './modules/token/token.module';
import { ProductImageModule } from './modules/product-image/product-image.module';
import { CategoryModule } from './modules/category/category.module';
import { CommentModule } from './modules/comment/comment.module';
import { RateModule } from './modules/rate/rate.module';
import { FavoriteModule } from './modules/favorite/favorite.module';
import { ProductCategoryModule } from './modules/product-category/product-category.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ConnectDBModule,
    AuthModule,
    UserModule,
    TokenModule,
    ProductModule,
    ProductImageModule,
    CategoryModule,
    CommentModule,
    RateModule,
    FavoriteModule,
    ProductCategoryModule,
    TokenModule,
  ],
})
export class AppModule {}
