import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AttributeService } from './attribute.service';
import { AddAttributeDTO } from './dto/add-attribute.dto';
import { IdDTO } from 'src/common/dto/id.dto';
import { UpdateAttributeDTO } from './dto/update-attribute.dto';
import { AttributeSummary } from 'src/common/constants/summary.constants';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/enums';

@ApiTags('Attribute')
@ApiBearerAuth()
@Controller('attribute')
export class AttributeController {
  constructor(private attributeService: AttributeService) {}

  @Post('')
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: AttributeSummary.ADD_ATTRIBUTE,
    description: `Role: ${Role.ADMIN}`,
  })
  async addAttribute(@Body() body: AddAttributeDTO) {
    return await this.attributeService.handleAddAttribute(body);
  }

  @Put('/:id')
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: AttributeSummary.UPDATE_ATTRIBUTE,
    description: `Role: ${Role.ADMIN}`,
  })
  async updateAttribute(
    @Param() idDTO: IdDTO,
    @Body() body: UpdateAttributeDTO,
  ) {
    return await this.attributeService.handleUpdateAttribute(idDTO, body);
  }

  @Delete('/:id')
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: AttributeSummary.DELETE_ATTRIBUTE,
    description: `Role: ${Role.ADMIN}`,
  })
  async deleteAttribute(@Param() idDTO: IdDTO) {
    return await this.attributeService.handleDeleteAttribute(idDTO);
  }
}
