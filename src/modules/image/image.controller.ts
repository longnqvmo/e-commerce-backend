import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/common/decorators/public.decorator';
// import { Roles } from 'src/common/decorators/roles.decorator';
// import { Role } from 'src/common/enums/enums';
import { ImageSummary } from 'src/common/constants/summary.constants';
import { ImageService } from './image.service';
import { IdDTO } from 'src/common/dto/id.dto';

@ApiTags('Images')
@ApiBearerAuth()
@Controller('images')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Post('/product/:id')
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
  @ApiOperation({ summary: ImageSummary.UPLOAD_PRODUCT_IMAGE })
  uploadProductImage(@Param() idDTO: IdDTO, @UploadedFile() file: any) {
    return this.imageService.uploadProductImage(idDTO, file);
  }

  @Post('/version/:id')
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
  @ApiOperation({ summary: ImageSummary.UPLOAD_VERSION_IMAGE })
  uploadVersionImage(@Param() idDTO: IdDTO, @UploadedFile() file: any) {
    return this.imageService.uploadVersionImage(idDTO, file);
  }
}
