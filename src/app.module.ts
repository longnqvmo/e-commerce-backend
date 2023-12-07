import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConnectDBModule } from './connect/database/database.connect';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { TokenModule } from './modules/token/token.module';
import { ProductImageModule } from './modules/product_image/product_image.module';
import { CategoryModule } from './modules/category/category.module';
import { CommentModule } from './modules/comment/comment.module';
import { RateModule } from './modules/rate/rate.module';
import { FavoriteModule } from './modules/favorite/favorite.module';
import { ProductCategoryModule } from './modules/product-category/product-category.module';
import { UploadModule } from './modules/upload/upload.module';
import { MailModule } from './modules/mail/mail.module';
import { AttributeModule } from './modules/attribute/attribute.module';
import { VersionModule } from './modules/version/version.module';
import { OptionModule } from './modules/option/option.module';
import { VAOModule } from './modules/version-attribute-option/version-attribute-option.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ConnectDBModule,
    AuthModule,
    UserModule,
    TokenModule,
    ProductModule,
    ProductImageModule,
    AttributeModule,
    OptionModule,
    VersionModule,
    VAOModule,
    CategoryModule,
    CommentModule,
    RateModule,
    FavoriteModule,
    ProductCategoryModule,
    ProductImageModule,
    UploadModule,
    MailModule,
  ],
})
export class AppModule {}
