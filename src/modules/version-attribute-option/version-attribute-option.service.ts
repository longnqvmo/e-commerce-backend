import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VersionAttributeOption } from './model/version-attribute-option.model';
import { HttpResponse } from 'src/configs/HttpResponse.config';
import { CommonMessage } from 'src/common/constants/message.constants';

@Injectable()
export class VAOService {
  constructor(
    @InjectRepository(VersionAttributeOption)
    private repository: Repository<VersionAttributeOption>,
  ) {}

  async handleAddVersionAttribute(data: any): Promise<HttpResponse> {
    try {
      for (let i = 0; i < data.attributes.length; i++) {
        const checkAttributeOption = await this.repository.findOne({
          where: {
            versionId: data.versionId,
            attributeId: data.attributes[i].attributeId,
            optionId: data.attributes[i].optionId,
          },
        });
        if (checkAttributeOption) {
          continue;
        } else {
          await this.repository.save({
            versionId: data.versionId,
            ...data.attributes[i],
          });
        }
      }
      return HttpResponse(HttpStatus.OK, CommonMessage.ADD_VERSION_SUCCEED);
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }
}
