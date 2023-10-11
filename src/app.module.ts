import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConnectDBModule } from './connect/database/database.connect';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { TokenModule } from './modules/token/token.module';
import { ProductImageModule } from './modules/product-image/product-image.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ConnectDBModule,
    UserModule,
    TokenModule,
    ProductModule,
    ProductImageModule,
    CategoryModule,
  ],
})
export class AppModule {}
