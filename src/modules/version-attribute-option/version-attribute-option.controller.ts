import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/enums';
import { ProductSummary } from 'src/common/constants/summary.constants';
import { VAOService } from './version-attribute-option.service';
import { AddVersionAttributeDTO } from './dto/add-vao.dto';

@ApiTags('Version-attribute-option')
@ApiBearerAuth()
@Controller('vao')
export class VAOController {
  constructor(private versionService: VAOService) {}

  @Post('')
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: ProductSummary.ADD_VERSION,
    description: `Role: ${Role.ADMIN}`,
  })
  async addVersionAttribute(@Body() body: AddVersionAttributeDTO) {
    return this.versionService.handleAddVersionAttribute(body);
  }
}
