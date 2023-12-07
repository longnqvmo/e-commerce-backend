import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Option } from './model/option.model';
import { HttpResponse } from 'src/configs/HttpResponse.config';
import {
  CommonMessage,
  ErrorMessage,
} from 'src/common/constants/message.constants';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(Option)
    private optionRepository: Repository<Option>,
  ) {}

  async handleAddOption(data: any): Promise<HttpResponse> {
    try {
      for (let i = 0; i < data.options.length; i++) {
        const result = await this.optionRepository.findOne({
          where: {
            attributeId: data.attributeId,
            option: data.options[i].option,
          },
        });
        if (result) {
          continue;
        } else {
          await this.optionRepository.save({
            attributeId: data.attributeId,
            option: data.options[i].option,
          });
        }
      }
      return HttpResponse(HttpStatus.CREATED, CommonMessage.ADD_OPTION_SUCCEED);
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleUpdateOption(param: any, data: any): Promise<HttpResponse> {
    try {
      const result = await this.optionRepository.findOne({
        where: { id: param.id },
      });
      if (result) {
        await this.optionRepository.update(param.id, {
          attributeId: result.attributeId,
          ...data,
        });
        return HttpResponse(
          HttpStatus.ACCEPTED,
          CommonMessage.UPDATE_OPTION_SUCCEED,
        );
      } else {
        return HttpResponse(
          HttpStatus.NOT_FOUND,
          ErrorMessage.OPTION_NOT_FOUND,
        );
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleDeleteOption(param: any): Promise<HttpResponse> {
    try {
      const result = await this.optionRepository.findOne({
        where: { id: param.id },
      });

      if (result) {
        await this.optionRepository.delete(param.id);
        return HttpResponse(
          HttpStatus.ACCEPTED,
          CommonMessage.DELETE_OPTION_SUCCEED,
        );
      } else {
        return HttpResponse(
          HttpStatus.NOT_FOUND,
          ErrorMessage.OPTION_NOT_FOUND,
        );
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }
}
