import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Version } from './model/version.model';
import { VersionController } from './version.controller';
import { VersionService } from './version.service';
import { VAOModule } from '../version-attribute-option/version-attribute-option.module';

@Module({
  imports: [TypeOrmModule.forFeature([Version]), VAOModule],
  controllers: [VersionController],
  providers: [VersionService],
  exports: [VersionService],
})
export class VersionModule {}
