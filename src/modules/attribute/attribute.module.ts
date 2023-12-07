import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attribute } from './model/attribute.model';
import { AttributeController } from './attribute.controller';
import { AttributeService } from './attribute.service';
import { OptionModule } from '../option/option.module';

@Module({
  imports: [TypeOrmModule.forFeature([Attribute]), OptionModule],
  controllers: [AttributeController],
  providers: [AttributeService],
})
export class AttributeModule {}
