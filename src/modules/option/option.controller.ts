import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OptionService } from './option.service';
import { AddOptionDTO } from './dto/add-option.dto';
import { IdDTO } from 'src/common/dto/id.dto';
import { UpdateOptionDTO } from './dto/update-option.dto';
import { AttributeSummary } from 'src/common/constants/summary.constants';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/enums';

@ApiTags('Option')
@ApiBearerAuth()
@Controller('option')
export class OptionController {
  constructor(private optionService: OptionService) {}

  @Post('')
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: AttributeSummary.ADD_OPTION,
    description: `Role: ${Role.ADMIN}`,
  })
  async addOption(@Body() body: AddOptionDTO) {
    return await this.optionService.handleAddOption(body);
  }

  @Put('/:id')
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: AttributeSummary.UPDATE_OPTION,
    description: `Role: ${Role.ADMIN}`,
  })
  async UpdateOption(@Param() idDTO: IdDTO, @Body() body: UpdateOptionDTO) {
    return await this.optionService.handleUpdateOption(idDTO, body);
  }

  @Delete('/:id')
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: AttributeSummary.DELETE_OPTION,
    description: `Role: ${Role.ADMIN}`,
  })
  async DeleteOption(@Param() idDTO: IdDTO) {
    return await this.optionService.handleDeleteOption(idDTO);
  }
}
