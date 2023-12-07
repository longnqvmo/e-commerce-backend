import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { VersionService } from './version.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/enums';
import { ProductSummary } from 'src/common/constants/summary.constants';
import { IdDTO } from 'src/common/dto/id.dto';
import { AddVersionDTO } from './dto/add-version.dto';
import { UpdateVersionDTO } from './dto/update-version.dto';
import { Public } from 'src/common/decorators/public.decorator';

@ApiTags('Version')
@ApiBearerAuth()
@Controller('version')
export class VersionController {
  constructor(private versionService: VersionService) {}

  @Get('')
  @Public()
  @ApiOperation({ summary: ProductSummary.GET_VERSION })
  async addProduct(@Query() idDTO: IdDTO) {
    return this.versionService.handleAddVersion(idDTO);
  }

  @Post('')
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: ProductSummary.ADD_VERSION,
    description: `Role: ${Role.ADMIN}`,
  })
  async addVersion(@Body() body: AddVersionDTO) {
    return this.versionService.handleAddVersion(body);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: ProductSummary.UPDATE_VERSION,
    description: `Role: ${Role.ADMIN}`,
  })
  async updateVersion(
    @Param() idDTO: IdDTO,
    @Body() updateVersionDTO: UpdateVersionDTO,
  ) {
    return this.versionService.handleUpdateVersion(idDTO, updateVersionDTO);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: ProductSummary.DELETE_VERSION,
    description: `Role: ${Role.ADMIN}`,
  })
  async deleteVersion(@Param() idDTO: IdDTO) {
    return this.versionService.handleDeleteVersion(idDTO);
  }
}
