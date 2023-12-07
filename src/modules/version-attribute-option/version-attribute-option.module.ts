import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VersionAttributeOption } from './model/version-attribute-option.model';
import { VAOController } from './version-attribute-option.controller';
import { VAOService } from './version-attribute-option.service';

@Module({
  imports: [TypeOrmModule.forFeature([VersionAttributeOption])],
  controllers: [VAOController],
  providers: [VAOService],
  exports: [VAOService],
})
export class VAOModule {}
