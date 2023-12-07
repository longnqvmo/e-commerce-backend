import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attribute } from './model/attribute.model';
import { HttpResponse } from 'src/configs/HttpResponse.config';
import {
  CommonMessage,
  ErrorMessage,
} from 'src/common/constants/message.constants';
import { OptionService } from '../option/option.service';

@Injectable()
export class AttributeService {
  constructor(
    @InjectRepository(Attribute)
    private attibuteRepository: Repository<Attribute>,
    private optionService: OptionService,
  ) {}

  async handleAddAttribute(data: any): Promise<HttpResponse> {
    try {
      const result = await this.attibuteRepository.findOne({
        where: { attribute: data.attribute },
      });
      if (result) {
        return HttpResponse(
          HttpStatus.BAD_REQUEST,
          ErrorMessage.ATTRIBUTE_EXISTS,
        );
      } else {
        const attribute = await this.attibuteRepository.save({
          attribute: data.attribute,
        });
        if (attribute && attribute.id) {
          await this.optionService.handleAddOption({
            attributeId: attribute.id,
            options: data.options,
          });
          return HttpResponse(
            HttpStatus.CREATED,
            CommonMessage.ADD_ATTRIBUTE_SUCCEED,
          );
        }
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleUpdateAttribute(param: any, data: any): Promise<HttpResponse> {
    try {
      const result = await this.attibuteRepository.findOne({
        where: { id: param.id },
      });
      if (result) {
        await this.attibuteRepository.update(param.id, {
          attribute: data.attribute,
        });
        return HttpResponse(
          HttpStatus.ACCEPTED,
          CommonMessage.UPDATE_ATTRIBUTE_SUCCEED,
        );
      } else {
        return HttpResponse(
          HttpStatus.NOT_FOUND,
          ErrorMessage.ATTRIBUTE_NOT_FOUND,
        );
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleDeleteAttribute(param: any): Promise<HttpResponse> {
    try {
      const result = await this.attibuteRepository.findOne({
        where: { id: param.id },
      });

      if (result) {
        await this.attibuteRepository.delete(param.id);
        return HttpResponse(
          HttpStatus.ACCEPTED,
          CommonMessage.DELETE_ATTRIBUTE_SUCCEED,
        );
      } else {
        return HttpResponse(
          HttpStatus.NOT_FOUND,
          ErrorMessage.ATTRIBUTE_NOT_FOUND,
        );
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }
}
