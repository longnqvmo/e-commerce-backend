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
import { ProductImageSummary } from 'src/common/constants/summary.constants';
import { ProductImageService } from './product-image.service';
import { IdDTO } from 'src/common/dto/id.dto';

@ApiTags('Product images')
@ApiBearerAuth()
@Controller('product-images')
export class ProductImageController {
  constructor(private productImageService: ProductImageService) {}

  @Post(':id')
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
  @ApiOperation({ summary: ProductImageSummary.UPLOAD_PRODUCT_IMAGE })
  uploadProductImage(@Param() idDTO: IdDTO, @UploadedFile() file: any) {
    return this.productImageService.uploadProductImage(idDTO, file);
  }
}
