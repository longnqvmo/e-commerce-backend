import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Version } from './model/version.model';
import { HttpResponse } from 'src/configs/HttpResponse.config';
import {
  CommonMessage,
  ErrorMessage,
} from 'src/common/constants/message.constants';
import { VAOService } from '../version-attribute-option/version-attribute-option.service';

@Injectable()
export class VersionService {
  constructor(
    @InjectRepository(Version)
    private versionRepository: Repository<Version>,
    private vaoService: VAOService,
  ) {}

  async handleGetVersion(query: any): Promise<HttpResponse> {
    try {
      await this.versionRepository.findOne({
        where: { id: query.id },
        relations: { versionAttributeOptions: true },
        select: {
          id: true,
          version: true,
          description: true,
        },
      });
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleAddVersion(data: any): Promise<HttpResponse> {
    try {
      for (let i = 0; i < data.versions.length; i++) {
        const result = await this.versionRepository.findOne({
          where: {
            productId: data.productId,
            version: data.versions[i].version,
          },
        });
        if (result) {
          continue;
        } else {
          const version = await this.versionRepository.save({
            productId: data.productId,
            version: data.versions[i].version,
            description: data.versions[i].description,
          });
          if (version && version.id) {
            await this.vaoService.handleAddVersionAttribute({
              versionId: version.id,
              attributes: data.versions[i].attributes,
            });
          }
        }
      }
      return HttpResponse(HttpStatus.OK, CommonMessage.ADD_VERSION_SUCCEED);
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleUpdateVersion(param: any, data: any): Promise<HttpResponse> {
    try {
      const result = await this.versionRepository.findOne({
        where: { id: param.id },
      });
      if (result) {
        await this.versionRepository.update(param.id, {
          productId: result.productId,
          ...data,
        });
        return HttpResponse(
          HttpStatus.OK,
          CommonMessage.UPDATE_VERSION_SUCCEED,
        );
      } else {
        return HttpResponse(
          HttpStatus.BAD_REQUEST,
          ErrorMessage.VERSION_EXISTS,
        );
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleDeleteVersion(param: any): Promise<HttpResponse> {
    try {
      const result = await this.versionRepository.findOne({
        where: { productId: param.id },
      });
      if (result) {
        await this.versionRepository.delete(param.id);
        return HttpResponse(
          HttpStatus.ACCEPTED,
          CommonMessage.DELETE_VERSION_SUCCEED,
        );
      } else {
        return HttpResponse(
          HttpStatus.NOT_FOUND,
          ErrorMessage.VERSION_NOT_FOUND,
        );
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }
}
