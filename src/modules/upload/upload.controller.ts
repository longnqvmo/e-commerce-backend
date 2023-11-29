import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Delete,
  Body,
  UploadedFiles,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { UploadService } from './upload.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadSummary } from 'src/common/constants/summary.constants';
import { imageFileValidate } from './upload.validate';

@ApiTags('Upload')
@ApiBearerAuth()
@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post('image')
  @Public()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({ summary: UploadSummary.UPLOAD_IMAGE })
  async uploadImageToCloud(@UploadedFile() file: any) {
    imageFileValidate(file);
    return await this.uploadService.uploadImage(file);
  }

  @Post('images')
  @Public()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        images: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('images'))
  @ApiOperation({ summary: UploadSummary.UPLOAD_IMAGES })
  async uploadImagesToCloud(@UploadedFiles() files: any) {
    files.map((item: any) => {
      imageFileValidate(item);
    });
    return await this.uploadService.uploadImages(files);
  }

  @Delete('image')
  @Public()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
      },
    },
  })
  @ApiOperation({ summary: UploadSummary.DELETE_IMAGE })
  async deleteImageFromCloud(@Body() file: any) {
    return await this.uploadService.deleteImage(file);
  }

  @Delete('images')
  @Public()
  @ApiBody({
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
        },
      },
    },
  })
  @ApiOperation({ summary: UploadSummary.DELETE_IMAGES })
  async deleteImagesFromCloud(@Body() files: any) {
    return await this.uploadService.deleteImages(files);
  }
}
